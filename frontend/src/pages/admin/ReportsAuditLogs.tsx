import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { SearchInput } from '../../components/common/SearchInput';
import { mockAuditLogs } from '../../data/mockData';

export const ReportsAuditLogs: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = mockAuditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          System Audit Logs & Security Reports
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Real-time security access trail, authentication logs, and data modification events.
        </p>
      </div>

      <Card className="p-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search audit events or usernames..." />
      </Card>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Log ID</TableHead>
              <TableHead>Event Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-xs text-slate-400">{log.id}</TableCell>
                <TableCell className="font-bold text-sm text-slate-900 dark:text-slate-100">{log.action}</TableCell>
                <TableCell className="text-xs font-semibold">{log.user}</TableCell>
                <TableCell><Badge variant="primary">{log.role}</Badge></TableCell>
                <TableCell className="text-xs text-slate-500">{log.timestamp}</TableCell>
                <TableCell className="font-mono text-xs">{log.ipAddress}</TableCell>
                <TableCell>
                  <Badge variant={log.status === 'Success' ? 'success' : 'danger'}>{log.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
