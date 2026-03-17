import React, { useState } from 'react';
import { Users, FileText, Bell, DollarSign, Plus, Search, Download, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Card, Button, Badge, SectionHeader, Input, Textarea, Grid } from './ui';
import { cooperative, coopMembers as initialMembers, announcements as initialAnnouncements, coopDocuments } from '../data/mockData';
import type { CoopMember, Announcement, MemberStatus } from '../types';

type Tab = 'overview' | 'members' | 'announcements' | 'documents';

const roleLabel: Record<string, string> = { chairperson:'Chairperson', secretary:'Secretary', treasurer:'Treasurer', member:'Member' };
const statusStyle: Record<MemberStatus, { color: string; bg: string; label: string }> = {
  active:   { color: '#065F46', bg: '#D1FAE5', label: 'Active' },
  inactive: { color: '#92400E', bg: '#FEF3C7', label: 'Inactive' },
  pending:  { color: '#1E40AF', bg: '#DBEAFE', label: 'Pending' },
};
const priorityStyle: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  high:   { color: '#991B1B', bg: '#FEE2E2', icon: <AlertTriangle size={13} /> },
  medium: { color: '#92400E', bg: '#FEF3C7', icon: <Clock size={13} /> },
  low:    { color: '#374151', bg: '#F3F4F6', icon: null },
};

// ─── Add Member Modal ─────────────────────────────────────────────────────────
function AddMemberModal({ onSave, onClose }: { onSave: (m: CoopMember) => void; onClose: () => void }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('member');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [farms, setFarms] = useState('');

  const handleSave = () => {
    if (!name) return;
    onSave({
      id: `m${Date.now()}`, name, role: role as CoopMember['role'],
      status: 'pending', location, joinedAt: new Date().toISOString().slice(0, 10),
      farmsHa: Number(farms) || 0, phone,
    });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 440, boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Add New Member</div>
          <button onClick={onClose} style={{ fontSize: 20, cursor: 'pointer', background: 'none', border: 'none', color: 'var(--color-text-muted)' }}>×</button>
        </div>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label="Full Name" value={name} onChange={setName} placeholder="e.g. Grace Phiri" required />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)' }}>Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: 13 }}>
              <option value="member">Member</option>
              <option value="chairperson">Chairperson</option>
              <option value="secretary">Secretary</option>
              <option value="treasurer">Treasurer</option>
            </select>
          </div>
          <Grid cols={2} gap={12}>
            <Input label="Location" value={location} onChange={setLocation} placeholder="e.g. Lusaka North" />
            <Input label="Phone" value={phone} onChange={setPhone} placeholder="+260 97 000 0000" />
          </Grid>
          <Input label="Farm Area (ha)" value={farms} onChange={setFarms} type="number" placeholder="0.0" />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={!name}>Add Member</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Post Announcement Modal ──────────────────────────────────────────────────
function PostAnnouncementModal({ onSave, onClose }: { onSave: (a: Announcement) => void; onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSave = () => {
    if (!title || !body) return;
    onSave({ id: `an${Date.now()}`, title, body, authorName: 'Ashley Ntaimo', createdAt: new Date().toISOString().slice(0, 10), priority: priority as Announcement['priority'] });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 480, boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Post Announcement</div>
          <button onClick={onClose} style={{ fontSize: 20, cursor: 'pointer', background: 'none', border: 'none', color: 'var(--color-text-muted)' }}>×</button>
        </div>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label="Title" value={title} onChange={setTitle} placeholder="Announcement subject" required />
          <Textarea label="Message" value={body} onChange={setBody} placeholder="Full announcement text..." required rows={4} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)' }}>Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: 13 }}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={!title || !body}>Post Announcement</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CooperativeHub() {
  const [tab, setTab] = useState<Tab>('overview');
  const [members, setMembers] = useState<CoopMember[]>(initialMembers);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [memberSearch, setMemberSearch] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);
  const [showPostAnnouncement, setShowPostAnnouncement] = useState(false);

  const filteredMembers = members.filter(m =>
    !memberSearch || m.name.toLowerCase().includes(memberSearch.toLowerCase()) || m.location.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const activeCount = members.filter(m => m.status === 'active').length;

  const TABS: { id: Tab; label: string; count?: number }[] = [
    { id: 'overview',       label: 'Overview' },
    { id: 'members',        label: 'Members', count: members.length },
    { id: 'announcements',  label: 'Announcements', count: announcements.length },
    { id: 'documents',      label: 'Documents', count: coopDocuments.length },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {showAddMember && <AddMemberModal onSave={m => { setMembers(p => [...p, m]); setShowAddMember(false); }} onClose={() => setShowAddMember(false)} />}
      {showPostAnnouncement && <PostAnnouncementModal onSave={a => { setAnnouncements(p => [a, ...p]); setShowPostAnnouncement(false); }} onClose={() => setShowPostAnnouncement(false)} />}

      <SectionHeader title="Cooperative Hub" subtitle={`${cooperative.name} &bull; ${cooperative.location} &bull; Est. ${cooperative.founded}`} />

      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--color-border)' }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '10px 18px', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', background: 'none', border: 'none',
              color: tab === t.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
              borderBottom: tab === t.id ? '2px solid var(--color-primary)' : '2px solid transparent',
              marginBottom: -1, display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {t.label}
            {t.count !== undefined && (
              <span style={{ fontSize: 11, background: tab === t.id ? 'var(--color-primary)' : 'var(--color-border)', color: tab === t.id ? '#fff' : 'var(--color-text-muted)', padding: '1px 6px', borderRadius: 99 }}>{t.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── Overview Tab ──────────────────────────────────────────────────── */}
      {tab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Stats */}
          <Grid cols={4} gap={16}>
            {[
              { label: 'Total Members', value: cooperative.memberCount, color: 'var(--color-primary)' },
              { label: 'Active Members', value: activeCount, color: 'var(--color-primary-md)' },
              { label: 'Total Farm Area', value: `${cooperative.totalFarmsHa} ha`, color: 'var(--color-teal)' },
              { label: 'Monthly Revenue', value: `$${cooperative.monthlyRevenueUSD.toLocaleString()}`, color: 'var(--color-gold)' },
            ].map(stat => (
              <Card key={stat.label}>
                <div style={{ padding: '14px 18px' }}>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                </div>
              </Card>
            ))}
          </Grid>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* About */}
            <Card>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>About the Cooperative</div>
              </div>
              <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{ fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{cooperative.description}</p>
                {[
                  { label: 'Plan', value: cooperative.plan.charAt(0).toUpperCase() + cooperative.plan.slice(1) },
                  { label: 'Location', value: cooperative.location },
                  { label: 'Founded', value: cooperative.founded },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderTop: '1px solid var(--color-border)' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>{item.label}</span>
                    <span style={{ fontWeight: 600 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Leadership */}
            <Card>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Leadership Committee</div>
              </div>
              <div style={{ padding: '8px 0' }}>
                {members.filter(m => m.role !== 'member').map(m => (
                  <div key={m.id} style={{ padding: '10px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{m.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{roleLabel[m.role]} &bull; {m.location}</div>
                    </div>
                    <Badge label={statusStyle[m.status].label} color={statusStyle[m.status].color} bg={statusStyle[m.status].bg} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ── Members Tab ───────────────────────────────────────────────────── */}
      {tab === 'members' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
              <Search size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input value={memberSearch} onChange={e => setMemberSearch(e.target.value)} placeholder="Search members..."
                style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: 13, outline: 'none', background: 'var(--color-white)' }} />
            </div>
            <Button icon={<Plus size={14} />} onClick={() => setShowAddMember(true)}>Add Member</Button>
          </div>

          <Card>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--color-gray-light)' }}>
                  {['Name', 'Role', 'Location', 'Farm Area', 'Phone', 'Joined', 'Status'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.4px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map(m => {
                  const ss = statusStyle[m.status];
                  return (
                    <tr key={m.id} style={{ borderTop: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: 600 }}>{m.name}</div>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--color-text-muted)', textTransform: 'capitalize' }}>{roleLabel[m.role]}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--color-text-muted)' }}>{m.location}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>{m.farmsHa} ha</td>
                      <td style={{ padding: '12px 16px', color: 'var(--color-text-muted)', fontSize: 12 }}>{m.phone}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--color-text-muted)', fontSize: 12 }}>{m.joinedAt}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <Badge label={ss.label} color={ss.color} bg={ss.bg} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {/* ── Announcements Tab ─────────────────────────────────────────────── */}
      {tab === 'announcements' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button icon={<Plus size={14} />} onClick={() => setShowPostAnnouncement(true)}>Post Announcement</Button>
          </div>
          {announcements.map(a => {
            const ps = priorityStyle[a.priority];
            return (
              <Card key={a.id}>
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ color: ps.color }}>{ps.icon}</div>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{a.title}</span>
                    </div>
                    <Badge label={a.priority.charAt(0).toUpperCase() + a.priority.slice(1)} color={ps.color} bg={ps.bg} />
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 10 }}>{a.body}</p>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
                    Posted by {a.authorName} on {a.createdAt}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* ── Documents Tab ─────────────────────────────────────────────────── */}
      {tab === 'documents' && (
        <Card>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>Shared Documents</span>
            <Button variant="secondary" size="sm" icon={<Plus size={12} />}>Upload Document</Button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--color-gray-light)' }}>
                {['Document Name', 'Type', 'Uploaded By', 'Date', 'Size', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.4px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coopDocuments.map(doc => (
                <tr key={doc.id} style={{ borderTop: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 4, background: doc.type === 'PDF' ? '#FEE2E2' : '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: doc.type === 'PDF' ? '#991B1B' : '#065F46' }}>
                        {doc.type}
                      </div>
                      {doc.name}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--color-text-muted)' }}>{doc.type}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--color-text-muted)' }}>{doc.uploadedBy}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--color-text-muted)', fontSize: 12 }}>{doc.uploadedAt}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--color-text-muted)', fontSize: 12 }}>{doc.sizeMb} MB</td>
                  <td style={{ padding: '12px 16px' }}>
                    <Button variant="ghost" size="sm" icon={<Download size={12} />}>Download</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
