import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Clock, 
  Target,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

interface AnalyticsData {
  totalCandidates: number;
  passedCandidates: number;
  failedCandidates: number;
  passRate: number;
  averageScores: {
    round1: number;
    round2: number;
    round3: number;
  };
  skillGaps: Array<{
    skill: string;
    weaknessCount: number;
    strengthCount: number;
  }>;
  timeDistribution: Array<{
    timeRange: string;
    count: number;
  }>;
  scoreDistribution: Array<{
    scoreRange: string;
    count: number;
  }>;
  recentAssessments: Array<{
    id: string;
    name: string;
    email: string;
    status: 'passed' | 'failed';
    scores: {
      round1: number;
      round2: number;
      round3: number;
    };
    completedAt: string;
  }>;
}

const AssessmentAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('7d');
  const [filterStatus, setFilterStatus] = useState('all');

  const COLORS = ['#4CAF50', '#f44336', '#2196F3', '#FF9800', '#9C27B0'];

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange, filterStatus]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockData: AnalyticsData = {
        totalCandidates: 150,
        passedCandidates: 89,
        failedCandidates: 61,
        passRate: 59.3,
        averageScores: {
          round1: 72.5,
          round2: 68.3,
          round3: 65.8
        },
        skillGaps: [
          { skill: 'JavaScript', weaknessCount: 45, strengthCount: 32 },
          { skill: 'Python', weaknessCount: 38, strengthCount: 41 },
          { skill: 'Communication', weaknessCount: 52, strengthCount: 28 },
          { skill: 'Problem Solving', weaknessCount: 41, strengthCount: 35 },
          { skill: 'React', weaknessCount: 48, strengthCount: 29 }
        ],
        timeDistribution: [
          { timeRange: '0-30 min', count: 25 },
          { timeRange: '30-60 min', count: 45 },
          { timeRange: '60-90 min', count: 38 },
          { timeRange: '90+ min', count: 42 }
        ],
        scoreDistribution: [
          { scoreRange: '0-20%', count: 12 },
          { scoreRange: '20-40%', count: 18 },
          { scoreRange: '40-60%', count: 31 },
          { scoreRange: '60-80%', count: 45 },
          { scoreRange: '80-100%', count: 44 }
        ],
        recentAssessments: [
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            status: 'passed',
            scores: { round1: 85, round2: 78, round3: 82 },
            completedAt: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            status: 'failed',
            scores: { round1: 45, round2: 52, round3: 38 },
            completedAt: '2024-01-15T09:15:00Z'
          }
        ]
      };
      
      setAnalyticsData(mockData);
    } catch (error) {
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    if (!analyticsData) return;
    
    const csvContent = [
      ['Metric', 'Value'],
      ['Total Candidates', analyticsData.totalCandidates],
      ['Passed Candidates', analyticsData.passedCandidates],
      ['Failed Candidates', analyticsData.failedCandidates],
      ['Pass Rate', `${analyticsData.passRate}%`],
      ['Average Round 1 Score', `${analyticsData.averageScores.round1}%`],
      ['Average Round 2 Score', `${analyticsData.averageScores.round2}%`],
      ['Average Round 3 Score', `${analyticsData.averageScores.round3}%`]
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assessment-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error || !analyticsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Failed to load analytics data'}</p>
          <button
            onClick={fetchAnalytics}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Assessment Analytics</h1>
              <p className="text-gray-600 mt-2">Comprehensive insights into candidate performance</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Status</option>
                <option value="passed">Passed Only</option>
                <option value="failed">Failed Only</option>
              </select>
              
              <button
                onClick={fetchAnalytics}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
              
              <button
                onClick={exportData}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.totalCandidates}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pass Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.passRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((analyticsData.averageScores.round1 + analyticsData.averageScores.round2 + analyticsData.averageScores.round3) / 3)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Time</p>
                <p className="text-2xl font-bold text-gray-900">67 min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Score Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="scoreRange" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pass/Fail Ratio */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pass/Fail Ratio</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Passed', value: analyticsData.passedCandidates },
                    { name: 'Failed', value: analyticsData.failedCandidates }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[0, 1].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Round Performance */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Round Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { round: 'Round 1 (Technical)', score: analyticsData.averageScores.round1 },
              { round: 'Round 2 (Communication)', score: analyticsData.averageScores.round2 },
              { round: 'Round 3 (Coding)', score: analyticsData.averageScores.round3 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="round" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, 'Average Score']} />
              <Bar dataKey="score" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Gaps */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Gap Analysis</h3>
          <div className="space-y-4">
            {analyticsData.skillGaps.map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{skill.skill}</h4>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Strengths: {skill.strengthCount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Weaknesses: {skill.weaknessCount}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Gap Score</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {skill.weaknessCount > skill.strengthCount ? 'High' : 'Low'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Assessments */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Assessments</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scores
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completed
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analyticsData.recentAssessments.map((assessment) => (
                  <tr key={assessment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{assessment.name}</div>
                        <div className="text-sm text-gray-500">{assessment.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        assessment.status === 'passed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {assessment.status === 'passed' ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex space-x-2">
                        <span>R1: {assessment.scores.round1}%</span>
                        <span>R2: {assessment.scores.round2}%</span>
                        <span>R3: {assessment.scores.round3}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(assessment.completedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentAnalytics;

