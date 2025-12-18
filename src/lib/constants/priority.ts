export function getPriorityLabel(priority: number | null): string {
  switch (priority) {
    case 0:
      return 'Urgent';
    case 1:
      return 'High';
    case 2:
      return 'Medium';
    case 3:
      return 'Low';
    default:
      return 'None';
  }
}
