# Data Pattern: React Query Integration

**Pattern ID:** `data-react-query-001`  
**Status:** 🟢 Canonical  
**Category:** Frontend Data Management  
**Created:** November 2025  
**Last Updated:** November 2025

---

## Use Case

Managing server state in React components with automatic caching, invalidation, and real-time updates.

---

## Context

TaskFlow Pro uses React Query for all server state management. This pattern ensures consistent data fetching, caching, and mutations across the application.

---

## Implementation

### Setup React Query

```typescript
// frontend/lib/queryClient.ts
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 1
    },
    mutations: {
      retry: 0
    }
  }
});
```

```typescript
// frontend/pages/_app.tsx
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '../lib/queryClient';

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### Custom Hooks for Queries

```typescript
// frontend/hooks/useTask.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { taskAPI } from '../lib/apiClient';
import { TaskCreate, TaskUpdate, TaskResponse } from '../types/api';

/**
 * Fetch a single task by ID
 */
export function useTask(taskId: number | null) {
  return useQuery<TaskResponse, Error>(
    ['task', taskId],
    () => {
      if (!taskId) throw new Error('Task ID required');
      return taskAPI.getTask(taskId);
    },
    {
      enabled: !!taskId, // Only run if taskId exists
      staleTime: 1000 * 60 * 2, // 2 minutes for individual tasks
    }
  );
}

/**
 * Fetch list of tasks with filters
 */
export function useTasks(filters?: {
  projectId?: number;
  status?: string;
  assigneeId?: number;
}) {
  return useQuery<TaskResponse[], Error>(
    ['tasks', filters],
    () => taskAPI.listTasks(filters),
    {
      staleTime: 1000 * 60, // 1 minute for lists
      // Keep previous data while fetching new filtered results
      keepPreviousData: true,
    }
  );
}

/**
 * Create a new task
 */
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation<TaskResponse, Error, TaskCreate>(
    (data) => taskAPI.createTask(data),
    {
      // Optimistic update
      onMutate: async (newTask) => {
        // Cancel outgoing refetches
        await queryClient.cancelQueries('tasks');

        // Snapshot previous value
        const previousTasks = queryClient.getQueryData<TaskResponse[]>('tasks');

        // Optimistically update cache
        if (previousTasks) {
          queryClient.setQueryData<TaskResponse[]>('tasks', (old) => {
            const optimisticTask = {
              ...newTask,
              id: Date.now(), // Temporary ID
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              created_by_id: 0, // Will be replaced with real value
            } as TaskResponse;
            
            return old ? [...old, optimisticTask] : [optimisticTask];
          });
        }

        return { previousTasks };
      },

      // On error, rollback
      onError: (err, newTask, context) => {
        if (context?.previousTasks) {
          queryClient.setQueryData('tasks', context.previousTasks);
        }
      },

      // Always refetch after error or success
      onSettled: () => {
        queryClient.invalidateQueries('tasks');
      },

      onSuccess: (data) => {
        // Update individual task cache
        queryClient.setQueryData(['task', data.id], data);
      },
    }
  );
}

/**
 * Update an existing task
 */
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation<
    TaskResponse,
    Error,
    { taskId: number; data: TaskUpdate }
  >(
    ({ taskId, data }) => taskAPI.updateTask(taskId, data),
    {
      onMutate: async ({ taskId, data }) => {
        await queryClient.cancelQueries(['task', taskId]);

        const previousTask = queryClient.getQueryData<TaskResponse>(['task', taskId]);

        // Optimistic update
        if (previousTask) {
          queryClient.setQueryData<TaskResponse>(['task', taskId], (old) => ({
            ...old!,
            ...data,
            updated_at: new Date().toISOString(),
          }));
        }

        return { previousTask };
      },

      onError: (err, { taskId }, context) => {
        if (context?.previousTask) {
          queryClient.setQueryData(['task', taskId], context.previousTask);
        }
      },

      onSuccess: (updatedTask) => {
        // Update both individual and list caches
        queryClient.setQueryData(['task', updatedTask.id], updatedTask);
        queryClient.invalidateQueries('tasks');
      },
    }
  );
}

/**
 * Delete a task
 */
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>(
    (taskId) => taskAPI.deleteTask(taskId),
    {
      onSuccess: (_, taskId) => {
        // Remove from individual cache
        queryClient.removeQueries(['task', taskId]);
        // Refresh list
        queryClient.invalidateQueries('tasks');
      },
    }
  );
}
```

### Usage in Components

```typescript
// frontend/components/TaskList.tsx
import { useTasks, useUpdateTask } from '../hooks/useTask';
import { TaskCard } from './TaskCard';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

interface TaskListProps {
  projectId?: number;
}

export function TaskList({ projectId }: TaskListProps) {
  // Fetch tasks
  const { data: tasks, isLoading, error } = useTasks({ projectId });
  
  // Mutation for status updates
  const { mutate: updateTask } = useUpdateTask();

  const handleStatusChange = (taskId: number, newStatus: string) => {
    updateTask({ taskId, data: { status: newStatus } });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!tasks || tasks.length === 0) {
    return <div>No tasks found</div>;
  }

  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
}
```

### Infinite Query for Pagination

```typescript
// frontend/hooks/useInfiniteTasks.ts
import { useInfiniteQuery } from 'react-query';
import { taskAPI } from '../lib/apiClient';

export function useInfiniteTasks(projectId?: number) {
  return useInfiniteQuery(
    ['tasks', 'infinite', projectId],
    ({ pageParam = 0 }) => taskAPI.listTasks({
      projectId,
      skip: pageParam,
      limit: 20,
    }),
    {
      getNextPageParam: (lastPage, allPages) => {
        // If we got fewer results than limit, we're done
        if (lastPage.length < 20) return undefined;
        // Next page starts after all current results
        return allPages.flatMap(page => page).length;
      },
    }
  );
}

// Usage in component
function InfiniteTaskList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteTasks();

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ))}
      
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
```

### Real-Time Updates with Polling

```typescript
// frontend/hooks/useTaskRealtime.ts
import { useQuery } from 'react-query';
import { taskAPI } from '../lib/apiClient';

export function useTaskRealtime(taskId: number) {
  return useQuery(
    ['task', taskId],
    () => taskAPI.getTask(taskId),
    {
      refetchInterval: 5000, // Poll every 5 seconds
      refetchIntervalInBackground: true, // Continue polling in background
    }
  );
}
```

---

## Testing

### Hook Testing

```typescript
// frontend/hooks/__tests__/useTask.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useTasks, useCreateTask } from '../useTask';
import { taskAPI } from '../../lib/apiClient';

jest.mock('../../lib/apiClient');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useTasks', () => {
  it('fetches tasks successfully', async () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', status: 'todo' },
      { id: 2, title: 'Task 2', status: 'done' },
    ];

    (taskAPI.listTasks as jest.Mock).mockResolvedValue(mockTasks);

    const { result } = renderHook(() => useTasks(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockTasks);
  });
});

describe('useCreateTask', () => {
  it('creates task and invalidates cache', async () => {
    const newTask = { title: 'New Task', project_id: 1 };
    const createdTask = { ...newTask, id: 3, created_at: '2025-11-19' };

    (taskAPI.createTask as jest.Mock).mockResolvedValue(createdTask);

    const { result } = renderHook(() => useCreateTask(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      result.current.mutate(newTask);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(createdTask);
  });
});
```

---

## Common Pitfalls

### ❌ Not Using Query Keys Properly
```typescript
// DON'T DO THIS - same key for different data
useQuery('tasks', () => taskAPI.listTasks())
useQuery('tasks', () => taskAPI.listTasks({ projectId: 1 }))
```

### ✅ Include Filters in Query Key
```typescript
// DO THIS - unique key per filter combination
useQuery(['tasks'], () => taskAPI.listTasks())
useQuery(['tasks', { projectId: 1 }], () => taskAPI.listTasks({ projectId: 1 }))
```

### ❌ Forgetting to Invalidate After Mutation
```typescript
// DON'T DO THIS - stale data remains
const mutation = useMutation((data) => taskAPI.createTask(data));
```

### ✅ Invalidate Relevant Queries
```typescript
// DO THIS - fresh data after mutation
const mutation = useMutation(
  (data) => taskAPI.createTask(data),
  {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    }
  }
);
```

### ❌ Fetching in Loops
```typescript
// DON'T DO THIS - N+1 query problem
tasks.map(task => {
  const { data } = useTask(task.id);  // Separate query per task!
  return <div>{data?.title}</div>;
});
```

### ✅ Fetch All at Once
```typescript
// DO THIS - single query for all tasks
const { data: tasks } = useTasks();
tasks?.map(task => <div>{task.title}</div>);
```

---

## Cache Management

### Query Key Structure
```
['task', 123]              // Single task
['tasks']                   // All tasks
['tasks', { projectId: 1 }] // Filtered tasks
['tasks', 'infinite', 1]    // Infinite query for project
```

### Invalidation Strategy
- **Create:** Invalidate all task lists
- **Update:** Invalidate specific task + all lists
- **Delete:** Remove specific task + invalidate all lists
- **Bulk operations:** Invalidate all task-related queries

---

## Performance Considerations

- **Stale Time:** Balance freshness vs. refetch frequency
- **Cache Time:** Keep data longer than stale time
- **Window Focus:** Refetch on tab return for fresh data
- **Background Refetch:** Continue updates when minimized
- **Optimistic Updates:** Immediate UI feedback
- **Pagination:** Use infinite query for long lists

---

## Related Patterns

- [`api-task-crud-pattern`](api_task_endpoint_pattern.md) - Backend API integration
- [`ui-task-card-pattern`](ui_task_card_pattern.md) - Component using this data
- [`error-handling-pattern`](error_handling_pattern.md) - Error state management

---

## Notes

- This pattern is **Canonical** - all server state MUST use React Query
- Never fetch data directly in components (use hooks)
- Always invalidate relevant queries after mutations
- Use optimistic updates for better UX
- Consider polling for real-time features
- DevTools essential for debugging cache

---

**Last Reviewed:** November 2025  
**Review Frequency:** Quarterly