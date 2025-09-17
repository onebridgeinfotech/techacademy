import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Activity, 
  Database, 
  Globe, 
  Shield, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  ExternalLink,
  Monitor,
  HardDrive,
  Cpu,
  Wifi,
  Lock,
  AlertTriangle
} from 'lucide-react';

interface SystemStatus {
  application: {
    status: 'running' | 'stopped' | 'error';
    uptime: string;
    memory: string;
    cpu: string;
  };
  nginx: {
    status: 'running' | 'stopped' | 'error';
    requests: number;
    errors: number;
  };
  server: {
    diskUsage: string;
    memoryUsage: string;
    cpuUsage: string;
    loadAverage: string;
  };
  network: {
    publicIP: string;
    privateIP: string;
    ports: Array<{port: number, status: 'open' | 'closed', service: string}>;
  };
  security: {
    firewall: 'active' | 'inactive';
    ssl: 'enabled' | 'disabled';
    lastUpdate: string;
  };
  logs: Array<{
    timestamp: string;
    level: 'info' | 'warning' | 'error';
    message: string;
  }>;
}

const AdminDashboard: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Mock data - in real implementation, this would come from your backend API
  const mockSystemStatus: SystemStatus = {
    application: {
      status: 'running',
      uptime: '2 days, 14 hours',
      memory: '45.2 MB',
      cpu: '2.1%'
    },
    nginx: {
      status: 'running',
      requests: 1247,
      errors: 3
    },
    server: {
      diskUsage: '8.2 GB / 20 GB (41%)',
      memoryUsage: '1.2 GB / 2 GB (60%)',
      cpuUsage: '15.3%',
      loadAverage: '0.45, 0.52, 0.48'
    },
    network: {
      publicIP: '13.232.196.147',
      privateIP: '172.31.45.123',
      ports: [
        { port: 22, status: 'open', service: 'SSH' },
        { port: 80, status: 'open', service: 'HTTP' },
        { port: 443, status: 'open', service: 'HTTPS' },
        { port: 3000, status: 'closed', service: 'App (Internal)' }
      ]
    },
    security: {
      firewall: 'active',
      ssl: 'enabled',
      lastUpdate: '2 hours ago'
    },
    logs: [
      { timestamp: '2024-01-15 14:30:25', level: 'info', message: 'Application started successfully' },
      { timestamp: '2024-01-15 14:25:10', level: 'info', message: 'Nginx configuration reloaded' },
      { timestamp: '2024-01-15 14:20:05', level: 'warning', message: 'High memory usage detected' },
      { timestamp: '2024-01-15 14:15:30', level: 'info', message: 'SSL certificate renewed' },
      { timestamp: '2024-01-15 14:10:15', level: 'error', message: 'Failed to connect to database' }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const fetchSystemStatus = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSystemStatus(mockSystemStatus);
      setIsLoading(false);
      setLastRefresh(new Date());
    };

    fetchSystemStatus();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchSystemStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
      case 'active':
      case 'enabled':
      case 'open':
        return 'text-green-600 bg-green-100';
      case 'stopped':
      case 'inactive':
      case 'disabled':
      case 'closed':
        return 'text-red-600 bg-red-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
      case 'active':
      case 'enabled':
      case 'open':
        return <CheckCircle className="w-4 h-4" />;
      case 'stopped':
      case 'inactive':
      case 'disabled':
      case 'closed':
        return <AlertCircle className="w-4 h-4" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'info':
        return 'text-blue-600 bg-blue-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading system status...</p>
        </div>
      </div>
    );
  }

  if (!systemStatus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load system status</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TechAcademy Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Real-time system monitoring and status</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last updated: {lastRefresh.toLocaleTimeString()}
              </div>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Application Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Server className="w-8 h-8 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Application</h3>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemStatus.application.status)}`}>
                    {getStatusIcon(systemStatus.application.status)}
                    <span className="ml-1 capitalize">{systemStatus.application.status}</span>
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Uptime: {systemStatus.application.uptime}</p>
              </div>
            </div>
          </div>

          {/* Nginx Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Nginx</h3>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemStatus.nginx.status)}`}>
                    {getStatusIcon(systemStatus.nginx.status)}
                    <span className="ml-1 capitalize">{systemStatus.nginx.status}</span>
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{systemStatus.nginx.requests} requests</p>
              </div>
            </div>
          </div>

          {/* Server Resources */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Monitor className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Server</h3>
                <p className="text-sm text-gray-900">CPU: {systemStatus.server.cpuUsage}</p>
                <p className="text-xs text-gray-500">Memory: {systemStatus.server.memoryUsage}</p>
              </div>
            </div>
          </div>

          {/* Security Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Security</h3>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemStatus.security.firewall)}`}>
                    {getStatusIcon(systemStatus.security.firewall)}
                    <span className="ml-1">Firewall</span>
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">SSL: {systemStatus.security.ssl}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Application Details */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Application Details</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemStatus.application.status)}`}>
                    {getStatusIcon(systemStatus.application.status)}
                    <span className="ml-1 capitalize">{systemStatus.application.status}</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Uptime</span>
                  <span className="text-sm text-gray-900">{systemStatus.application.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Memory Usage</span>
                  <span className="text-sm text-gray-900">{systemStatus.application.memory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">CPU Usage</span>
                  <span className="text-sm text-gray-900">{systemStatus.application.cpu}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Network Information */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Network Information</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Public IP</span>
                  <span className="text-sm text-gray-900 font-mono">{systemStatus.network.publicIP}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Private IP</span>
                  <span className="text-sm text-gray-900 font-mono">{systemStatus.network.privateIP}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 block mb-2">Port Status</span>
                  <div className="space-y-2">
                    {systemStatus.network.ports.map((port, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-900">{port.port} ({port.service})</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(port.status)}`}>
                          {getStatusIcon(port.status)}
                          <span className="ml-1 capitalize">{port.status}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Server Resources */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Server Resources</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Disk Usage</span>
                  <span className="text-sm text-gray-900">{systemStatus.server.diskUsage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Memory Usage</span>
                  <span className="text-sm text-gray-900">{systemStatus.server.memoryUsage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">CPU Usage</span>
                  <span className="text-sm text-gray-900">{systemStatus.server.cpuUsage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Load Average</span>
                  <span className="text-sm text-gray-900 font-mono">{systemStatus.server.loadAverage}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Logs */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Logs</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {systemStatus.logs.map((log, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLogLevelColor(log.level)}`}>
                      {log.level}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{log.message}</p>
                      <p className="text-xs text-gray-500">{log.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <a
                href={`http://${systemStatus.network.publicIP}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Site
              </a>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Restart App
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Database className="w-4 h-4 mr-2" />
                View Logs
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Shield className="w-4 h-4 mr-2" />
                Security Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
