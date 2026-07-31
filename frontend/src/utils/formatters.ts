export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getStatusBadgeVariant(status: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  switch (status.toLowerCase()) {
    case 'approved':
    case 'completed':
    case 'normal':
    case 'success':
    case 'on duty':
      return 'success';
    case 'pending':
    case 'warning':
    case 'due':
    case 'scheduled':
      return 'warning';
    case 'rejected':
    case 'cancelled':
    case 'emergency':
    case 'critical':
    case 'abnormal':
    case 'failed':
      return 'danger';
    case 'in-person':
    case 'teleconsultation':
      return 'info';
    default:
      return 'neutral';
  }
}
