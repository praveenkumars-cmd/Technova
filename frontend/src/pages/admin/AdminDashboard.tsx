import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { RevenueOverviewChart } from '../../components/charts/RevenueOverviewChart';
import { DepartmentDistributionChart } from '../../components/charts/DepartmentDistributionChart';
import { EmergencyCasesChart } from '../../components/charts/EmergencyCasesChart';
import {
  Users,
  Building2,
  CalendarCheck,
  DollarSign,
  Shield,
  Activity,
  Database,
  Server,
  Download,
  Plus,
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { useNotifications } from '../../context/NotificationContext';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const handleBackupNow = () => {
    showToast('Database Backup Started', 'System snapshot initiated. Target: S3-Health-Vault', 'success');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Hero */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-6 sm:p-8 rounded-3xl shadow-glow-primary">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-soft-sm"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Executive System Administration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hospital System Operations & Analytics
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 mt-1">
              System Health: <span className="font-bold underline">99.98% Uptime</span> • Active Database Sessions: <span className="font-bold">142</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap w-full sm:w-auto">
          <Button
            variant="secondary"
            size="md"
            className="w-full sm:w-auto bg-white text-purple-900 hover:bg-purple-50 border-none font-bold"
            leftIcon={<Database className="w-4 h-4" />}
            onClick={handleBackupNow}
          >
            Trigger System Backup
          </Button>
        </div>
      </div>

      {/* System Status Metrics Card */}
      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between flex-wrap gap-4 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
        <div className="flex items-center gap-3">
          <Server className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            <strong>System Operational Status:</strong> All 12 Clinical Microservices Online (HIPAA Vault, EHR Storage, Recharts Engine).
          </span>
        </div>
        <Badge variant="success" dot>99.98% Active</Badge>
      </div>

      {/* KPI Cards Grid (8 metrics as required) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Doctors" value="124" change="+4 This Month" changeType="positive" icon={<Users className="w-5 h-5" />} iconBgColor="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400" />
        <StatCard title="Registered Patients" value="12,480" change="+380 Growth" changeType="positive" icon={<Users className="w-5 h-5" />} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400" />
        <StatCard title="Receptionists & Desk" value="18" change="Full Roster" changeType="neutral" icon={<Building2 className="w-5 h-5" />} iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400" />
        <StatCard title="Nursing & Staff" value="84" change="Active" changeType="positive" icon={<Users className="w-5 h-5" />} iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400" />
        <StatCard title="Hospital Departments" value="6" change="Fully Staffed" changeType="neutral" icon={<Building2 className="w-5 h-5" />} iconBgColor="bg-cyan-50 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400" />
        <StatCard title="Total Appointments" value="1,120" change="+18% MoM" changeType="positive" icon={<CalendarCheck className="w-5 h-5" />} iconBgColor="bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400" />
        <StatCard title="Monthly Revenue" value={formatCurrency(320000)} change="+14% MoM" changeType="positive" icon={<DollarSign className="w-5 h-5" />} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400" />
        <StatCard title="System Server Status" value="Healthy" change="14ms Latency" changeType="positive" icon={<Activity className="w-5 h-5" />} iconBgColor="bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400" />
      </div>

      {/* Analytics Charts Suite */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle>Hospital Revenue Overview (Insurance vs Out-of-Pocket)</CardTitle>
          </CardHeader>
          <RevenueOverviewChart />
        </Card>

        <Card className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle>Department Consultation Share</CardTitle>
          </CardHeader>
          <DepartmentDistributionChart />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle>Emergency Resuscitation Cases (Weekly ER Triage)</CardTitle>
          </CardHeader>
          <EmergencyCasesChart />
        </Card>

        {/* Quick Admin Navigation */}
        <Card className="p-6 flex flex-col justify-between space-y-3">
          <div>
            <CardTitle className="mb-3">Quick Executive Operations</CardTitle>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start" leftIcon={<Users className="w-4 h-4" />} onClick={() => navigate('/admin/doctors')}>
                Manage Doctors Directory
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" leftIcon={<Building2 className="w-4 h-4" />} onClick={() => navigate('/admin/departments')}>
                Manage Departments
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" leftIcon={<Shield className="w-4 h-4" />} onClick={() => navigate('/admin/permissions')}>
                Roles & Permission Matrix
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" leftIcon={<Activity className="w-4 h-4" />} onClick={() => navigate('/admin/audit-logs')}>
                View Audit Trail Logs
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
