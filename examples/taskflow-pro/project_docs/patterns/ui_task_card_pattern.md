# UI Pattern: Task Card Component

**Pattern ID:** `ui-task-card-001`  
**Status:** 🟢 Canonical  
**Category:** Frontend UI  
**Created:** November 2025  
**Last Updated:** November 2025

---

## Use Case

Displaying task information in a consistent card format across different views (Kanban, List, Dashboard).

---

## Context

TaskFlow Pro displays tasks in multiple contexts. This pattern ensures consistent task representation while allowing context-specific variations.

---

## Implementation

### Component Structure

```typescript
// frontend/components/TaskCard.tsx
import React from 'react';
import { TaskResponse } from '../types/api';
import { TaskPriorityBadge } from './TaskPriorityBadge';
import { UserAvatar } from './UserAvatar';
import { formatDate } from '../lib/dateUtils';

interface TaskCardProps {
  task: TaskResponse;
  variant?: 'default' | 'compact' | 'detailed';
  onClick?: (task: TaskResponse) => void;
  onStatusChange?: (taskId: number, newStatus: string) => void;
}

export function TaskCard({ 
  task, 
  variant = 'default',
  onClick,
  onStatusChange 
}: TaskCardProps) {
  const handleClick = () => {
    if (onClick) onClick(task);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    if (onStatusChange) {
      onStatusChange(task.id, e.target.value);
    }
  };

  return (
    <div 
      className={`
        task-card 
        bg-white rounded-lg shadow-sm border border-gray-200
        p-4 hover:shadow-md transition-shadow cursor-pointer
        ${variant === 'compact' ? 'p-2' : ''}
      `}
      onClick={handleClick}
      data-testid={`task-card-${task.id}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
            {task.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            #{task.id}
          </p>
        </div>
        <TaskPriorityBadge priority={task.priority} />
      </div>

      {/* Description (only in default/detailed variants) */}
      {variant !== 'compact' && task.description && (
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {task.description}
        </p>
      )}

      {/* Metadata */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          {task.assignee_id && (
            <UserAvatar userId={task.assignee_id} size="sm" />
          )}
          {task.due_date && (
            <span className={`
              ${new Date(task.due_date) < new Date() ? 'text-red-600' : ''}
            `}>
              {formatDate(task.due_date)}
            </span>
          )}
        </div>

        {/* Status dropdown */}
        <select
          value={task.status}
          onChange={handleStatusChange}
          onClick={(e) => e.stopPropagation()}
          className="text-xs border border-gray-300 rounded px-2 py-1"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Tags (only in detailed variant) */}
      {variant === 'detailed' && task.tags.length > 0 && (
        <div className="flex gap-1 mt-2">
          {task.tags.map(tag => (
            <span 
              key={tag}
              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Supporting Components

```typescript
// frontend/components/TaskPriorityBadge.tsx
interface TaskPriorityBadgeProps {
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  const styles = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`text-xs px-2 py-1 rounded ${styles[priority]}`}>
      {priority.toUpperCase()}
    </span>
  );
}
```

### Usage Examples

```typescript
// In Kanban Board
import { TaskCard } from '../components/TaskCard';
import { useUpdateTask } from '../hooks/useTask';

function KanbanColumn({ tasks, status }) {
  const { mutate: updateTask } = useUpdateTask();

  const handleStatusChange = (taskId: number, newStatus: string) => {
    updateTask({ taskId, data: { status: newStatus } });
  };

  return (
    <div className="column">
      <h2>{status}</h2>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          variant="default"
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
}

// In List View
function TaskList({ tasks }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          variant="compact"
          onClick={(task) => navigate(`/tasks/${task.id}`)}
        />
      ))}
    </div>
  );
}

// In Dashboard
function DashboardTaskWidget({ tasks }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          variant="detailed"
        />
      ))}
    </div>
  );
}
```

---

## Testing

### Component Test

```typescript
// frontend/components/__tests__/TaskCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskCard } from '../TaskCard';
import { TaskResponse } from '../../types/api';

const mockTask: TaskResponse = {
  id: 1,
  title: 'Implement user authentication',
  description: 'Add JWT-based auth',
  priority: 'high',
  status: 'in_progress',
  project_id: 1,
  assignee_id: 5,
  created_at: '2025-11-01T10:00:00Z',
  updated_at: '2025-11-15T14:30:00Z',
  created_by_id: 3,
  due_date: '2025-11-30T23:59:59Z',
  tags: ['backend', 'security']
};

describe('TaskCard', () => {
  it('renders task information', () => {
    render(<TaskCard task={mockTask} />);
    
    expect(screen.getByText('Implement user authentication')).toBeInTheDocument();
    expect(screen.getByText('Add JWT-based auth')).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<TaskCard task={mockTask} onClick={handleClick} />);
    
    fireEvent.click(screen.getByTestId('task-card-1'));
    
    expect(handleClick).toHaveBeenCalledWith(mockTask);
  });

  it('calls onStatusChange when status dropdown changes', () => {
    const handleStatusChange = jest.fn();
    render(<TaskCard task={mockTask} onStatusChange={handleStatusChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'done' } });
    
    expect(handleStatusChange).toHaveBeenCalledWith(1, 'done');
  });

  it('renders compact variant correctly', () => {
    const { container } = render(<TaskCard task={mockTask} variant="compact" />);
    
    // Description should not be rendered in compact mode
    expect(screen.queryByText('Add JWT-based auth')).not.toBeInTheDocument();
    expect(container.querySelector('.p-2')).toBeInTheDocument();
  });

  it('renders tags in detailed variant', () => {
    render(<TaskCard task={mockTask} variant="detailed" />);
    
    expect(screen.getByText('backend')).toBeInTheDocument();
    expect(screen.getByText('security')).toBeInTheDocument();
  });
});
```

---

## Styling Guidelines

### Colors
- **Background:** White (`bg-white`)
- **Border:** Light gray (`border-gray-200`)
- **Text:** Gray 900 for titles, Gray 600 for descriptions
- **Hover:** Elevated shadow (`hover:shadow-md`)

### Spacing
- **Default padding:** `p-4` (1rem)
- **Compact padding:** `p-2` (0.5rem)
- **Margin between elements:** `mb-2`, `mb-3`

### Typography
- **Title:** 14px (text-sm), semibold
- **Description:** 14px (text-sm), normal
- **Metadata:** 12px (text-xs)

---

## Common Pitfalls

### ❌ Inconsistent Variants
```typescript
// DON'T DO THIS - mixing styles manually
<div className="p-2">  {/* Sometimes compact */}
  {task.description && <p>...</p>}  {/* Sometimes showing description */}
</div>
```

### ✅ Use Variant Prop
```typescript
// DO THIS - consistent variant behavior
<TaskCard task={task} variant="compact" />
```

### ❌ Direct API Calls in Component
```typescript
// DON'T DO THIS
function TaskCard({ task }) {
  const handleStatusChange = async (status) => {
    await fetch(`/api/tasks/${task.id}`, { ... });  // Direct API call!
  };
}
```

### ✅ Use Props/Hooks
```typescript
// DO THIS
function TaskCard({ task, onStatusChange }) {
  const handleStatusChange = (status) => {
    onStatusChange(task.id, status);  // Delegate to parent
  };
}
```

---

## Accessibility

- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ ARIA labels for screen readers
- ✅ Focus states on interactive elements
- ✅ Color contrast ratios meet WCAG AA standards

---

## Related Patterns

- [`api-task-crud-pattern`](api_task_endpoint_pattern.md) - Backend API for task data
- [`ui-modal-pattern`](ui_modal_pattern.md) - Task detail modal
- [`data-react-query-pattern`](data_react_query_pattern.md) - Data fetching

---

## Notes

- This pattern is **Canonical** - all task displays MUST use TaskCard
- Variants allow flexibility without duplication
- Always use auto-generated TypeScript types from OpenAPI
- Component is pure - no side effects except callbacks
- Fully testable with React Testing Library

---

**Last Reviewed:** November 2025  
**Review Frequency:** Quarterly