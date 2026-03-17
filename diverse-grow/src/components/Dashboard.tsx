import React from 'react';
import { TrendingUp, Sprout, ShoppingCart, Users, AlertCircle, ArrowRight, DollarSign, Layers } from 'lucide-react';
import { Card, StatCard, SectionHeader, Button, Badge, Grid } from './ui';
import { currentUser, crops, yieldHistory, activityLogs, listings, announcements } from '../data/mockData';
import type { Screen } from '../types';

interface Props { onNavigate: (s: Screen) => void; }

// Simple bar chart using divs
function BarChart() {
  const max = Math.max(...yieldHistory.map(r => r.yieldTonnes));
  return (
    <div style={{ padding: '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
        {yieldHistory.map((r, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: 9, color: 'var(--color-text-muted)' }}>{r.yieldTonnes}t</span>
            <div
              style={{
                width: '100%', borderRadius: '3px 3px 0 0',
                background: i === yieldHistory.length - 1 ? 'var(--color-primary)' : 'var(--color-accent)',
                height: `${(r.yieldTonnes / max) * 100}%`, minHeight: 4,
                transition: 'height .3s',
              }}
            />
            <span style={{ fontSize: 9, color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>{r.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const statusColors: Record<string, { bg: string; color: string }> = {
  planted:    { bg: '#EFF6FF', color: '#1D4ED8' },
  germinating:{ bg: '#FEF3C7', color: '#D97706' },
  growing:    { bg: '#D1FAE5', color: '#065F46' },
  flowering:  { bg: '#FCE7F3', color: '#9D174D' },
  harvesting: { bg: '#F5F3FF', color: '#5B21B6' },
  harvested:  { bg: '#F3F4F6', color: '#4B5563' },
};

export default function Dashboard({ onNavigate }: Props) {
  const totalIncome = yieldHistory.reduce((s, r) => s + r.incomeUSD, 0);
  const totalArea = crops.reduce((s, c) => s + c.areaHa, 0);
  const activeListings = listings.filter(l => l.status === 'active').length;
  const highPriorityAnnouncements = announcements.filter(a => a.priority === 'high');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Welcome */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary-dk) 0%, var(--color-primary) 100%)',
        borderRadius: 'var(--radius-lg)', padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', fontWeight: 600, letterSpacing: '.5px', textTransform: 'uppercase', marginBottom: 4 }}>
            Welcome back
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
            {currentUser.name}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)' }}>
            {currentUser.cooperative} &middot; {currentUser.location}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          {highPriorityAnnouncements.length > 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(230,168,23,.15)', border: '1px solid rgba(230,168,23,.3)',
              borderRadius: 8, padding: '6px 12px', color: 'var(--color-gold)',
              fontSize: 12, fontWeight: 600,
            }}>
              <AlertCircle size={14} />
              {highPriorityAnnouncements[0].title}
            </div>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <Grid cols={4} gap={16}>
        <StatCard label="Total Farm Area" value={`${totalArea.toFixed(1)} ha`} sub={`${crops.length} active crops`} />
        <StatCard label="Season Income" value={`$${totalIncome.toLocaleString()}`} sub="Last 8 months" accentColor="var(--color-teal)" />
        <StatCard label="Active Listings" value={activeListings} sub="On marketplace" accentColor="var(--color-gold)" />
        <StatCard label="Cooperative" value="48" sub="Members in your coop" accentColor="var(--color-primary-md)" />
      </Grid>

      {/* Two-col layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Active Crops */}
        <Card>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sprout size={16} color="var(--color-primary)" />
              <span style={{ fontWeight: 700, fontSize: 14 }}>Active Crops</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('farm-management')}>
              View all <ArrowRight size={12} />
            </Button>
          </div>
          <div style={{ padding: '8px 0' }}>
            {crops.map(crop => {
              const sc = statusColors[crop.status] || statusColors.growing;
              return (
                <div key={crop.id} style={{ padding: '10px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{crop.name}</span>
                      <Badge label={crop.status.replace('-', ' ')} color={sc.color} bg={sc.bg} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, background: '#E2E8F0', borderRadius: 99, height: 5, overflow: 'hidden' }}>
                        <div style={{ width: `${crop.progressPercent}%`, height: '100%', background: 'var(--color-primary)', borderRadius: 99 }} />
                      </div>
                      <span style={{ fontSize: 11, color: 'var(--color-text-muted)', width: 28 }}>{crop.progressPercent}%</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text)' }}>{crop.areaHa} ha</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{crop.variety}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Yield Chart */}
        <Card>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <TrendingUp size={16} color="var(--color-primary)" />
              <span style={{ fontWeight: 700, fontSize: 14 }}>Yield History (tonnes)</span>
            </div>
          </div>
          <BarChart />
          <div style={{ padding: '0 20px 16px', display: 'flex', gap: 16 }}>
            {[
              { label: 'Total yield', value: `${yieldHistory.reduce((s,r)=>s+r.yieldTonnes,0).toFixed(1)} t` },
              { label: 'Total income', value: `$${totalIncome}` },
              { label: 'Best month', value: 'Jan' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{stat.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)' }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Recent Activity */}
        <Card>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Layers size={16} color="var(--color-primary)" />
              <span style={{ fontWeight: 700, fontSize: 14 }}>Recent Activity</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('farm-management')}>View all <ArrowRight size={12} /></Button>
          </div>
          <div style={{ padding: '8px 0' }}>
            {activityLogs.slice(0, 4).map(log => (
              <div key={log.id} style={{ padding: '10px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-accent)', marginTop: 4, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 1 }}>{log.cropName} — {log.type}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.description}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-border)', marginTop: 2, fontStyle: 'italic' }}>{log.date}</div>
                </div>
                {log.cost && <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-danger)', flexShrink: 0 }}>-${log.cost}</div>}
              </div>
            ))}
          </div>
        </Card>

        {/* Cooperative Announcements */}
        <Card>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={16} color="var(--color-primary)" />
              <span style={{ fontWeight: 700, fontSize: 14 }}>Cooperative Updates</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('cooperative')}>View all <ArrowRight size={12} /></Button>
          </div>
          <div style={{ padding: '8px 0' }}>
            {announcements.slice(0, 3).map(a => {
              const pColors: Record<string, string> = { high: '#C0392B', medium: '#D97706', low: '#64748B' };
              const priorityColor = pColors[a.priority] ?? '#64748B';
              return (
                <div key={a.id} style={{ padding: '10px 20px', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: priorityColor, marginTop: 5, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{a.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-muted)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {a.body}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
