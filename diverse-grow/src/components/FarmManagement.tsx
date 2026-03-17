import React, { useState } from 'react';
import { Plus, Sprout, ChevronDown, Calendar, DollarSign, MapPin, Edit2, CheckCircle } from 'lucide-react';
import { Card, Button, Badge, ProgressBar, SectionHeader, Input, Textarea, Select, Grid } from './ui';
import { crops as initialCrops, plots, yieldHistory, activityLogs as initialLogs } from '../data/mockData';
import type { Crop, ActivityLog } from '../types';

const STATUS_OPTIONS = [
  { value: 'planted',     label: 'Planted' },
  { value: 'germinating', label: 'Germinating' },
  { value: 'growing',     label: 'Growing' },
  { value: 'flowering',   label: 'Flowering' },
  { value: 'harvesting',  label: 'Ready to Harvest' },
  { value: 'harvested',   label: 'Harvested' },
];

const statusColor: Record<string, string> = {
  planted: '#1D4ED8', germinating: '#D97706', growing: '#065F46',
  flowering: '#9D174D', harvesting: '#5B21B6', harvested: '#4B5563',
};
const statusBg: Record<string, string> = {
  planted: '#EFF6FF', germinating: '#FEF3C7', growing: '#D1FAE5',
  flowering: '#FCE7F3', harvesting: '#F5F3FF', harvested: '#F3F4F6',
};
const activityTypeColor: Record<string, string> = {
  planting: '#1D4ED8', watering: '#0891B2', fertilising: '#16A34A',
  spraying: '#D97706', harvesting: '#7C3AED', observation: '#64748B',
};

// ─── Log Activity Modal ───────────────────────────────────────────────────────
interface LogModalProps {
  cropName: string;
  cropId: string;
  onSave: (log: ActivityLog) => void;
  onClose: () => void;
}
function LogModal({ cropName, cropId, onSave, onClose }: LogModalProps) {
  const [type, setType] = useState('observation');
  const [desc, setDesc] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSave = () => {
    if (!desc.trim()) return;
    onSave({
      id: `a${Date.now()}`, cropId, cropName, date, type: type as ActivityLog['type'],
      description: desc.trim(), cost: cost ? Number(cost) : undefined,
    });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 440, boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Log Activity — {cropName}</div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', fontSize: 20, lineHeight: 1, cursor: 'pointer', background: 'none', border: 'none' }}>×</button>
        </div>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Select label="Activity Type" value={type} onChange={setType} options={[
            {value:'observation',label:'Observation'},
            {value:'planting',   label:'Planting'},
            {value:'watering',   label:'Watering/Irrigation'},
            {value:'fertilising',label:'Fertilising'},
            {value:'spraying',   label:'Spraying/Pest Control'},
            {value:'harvesting', label:'Harvesting'},
          ]} />
          <Input label="Date" value={date} onChange={setDate} type="date" required />
          <Textarea label="Description" value={desc} onChange={setDesc} placeholder="Describe what was done..." required rows={3} />
          <Input label="Cost (USD, optional)" value={cost} onChange={setCost} type="number" placeholder="0.00" />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={!desc.trim()}>Save Activity</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Add Crop Modal ───────────────────────────────────────────────────────────
interface AddCropModalProps { onSave: (c: Crop) => void; onClose: () => void; }
function AddCropModal({ onSave, onClose }: AddCropModalProps) {
  const [name, setName] = useState('');
  const [variety, setVariety] = useState('');
  const [plotId, setPlotId] = useState(plots[0].id);
  const [planted, setPlanted] = useState(new Date().toISOString().slice(0, 10));
  const [harvest, setHarvest] = useState('');
  const [area, setArea] = useState('');
  const [cost, setCost] = useState('');

  const handleSave = () => {
    if (!name || !harvest) return;
    onSave({
      id: `c${Date.now()}`, name, variety, plotId, plantedDate: planted,
      expectedHarvestDate: harvest, status: 'planted', progressPercent: 5,
      areaHa: Number(area) || 1, inputCost: Number(cost) || 0, notes: '',
    });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 480, boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Add New Crop</div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', fontSize: 20, lineHeight: 1, cursor: 'pointer', background: 'none', border: 'none' }}>×</button>
        </div>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Grid cols={2} gap={12}>
            <Input label="Crop Name" value={name} onChange={setName} placeholder="e.g. Maize" required />
            <Input label="Variety" value={variety} onChange={setVariety} placeholder="e.g. ZM523" />
          </Grid>
          <Select label="Plot" value={plotId} onChange={setPlotId} options={plots.map(p => ({ value: p.id, label: `${p.name} (${p.areaHa} ha)` }))} />
          <Grid cols={2} gap={12}>
            <Input label="Planted Date" value={planted} onChange={setPlanted} type="date" required />
            <Input label="Expected Harvest" value={harvest} onChange={setHarvest} type="date" required />
          </Grid>
          <Grid cols={2} gap={12}>
            <Input label="Area (ha)" value={area} onChange={setArea} type="number" placeholder="1.0" />
            <Input label="Input Cost (USD)" value={cost} onChange={setCost} type="number" placeholder="0" />
          </Grid>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={!name || !harvest}>Add Crop</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FarmManagement() {
  const [crops, setCrops] = useState<Crop[]>(initialCrops);
  const [logs, setLogs] = useState<ActivityLog[]>(initialLogs);
  const [selectedCropId, setSelectedCropId] = useState<string>(initialCrops[0].id);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'activity'>('overview');

  const selectedCrop = crops.find(c => c.id === selectedCropId)!;
  const selectedPlot = plots.find(p => p.id === selectedCrop.plotId)!;
  const cropLogs = logs.filter(l => l.cropId === selectedCropId);

  const totalArea = crops.reduce((s, c) => s + c.areaHa, 0);
  const totalCost = crops.reduce((s, c) => s + c.inputCost, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {showLogModal && selectedCrop && (
        <LogModal cropName={selectedCrop.name} cropId={selectedCrop.id}
          onSave={log => { setLogs(prev => [log, ...prev]); setShowLogModal(false); }}
          onClose={() => setShowLogModal(false)} />
      )}
      {showAddModal && (
        <AddCropModal
          onSave={c => { setCrops(prev => [...prev, c]); setShowAddModal(false); }}
          onClose={() => setShowAddModal(false)} />
      )}

      <SectionHeader
        title="Farm Management"
        subtitle={`${crops.length} crops across ${plots.length} plots — ${totalArea.toFixed(1)} ha total`}
        action={<Button icon={<Plus size={14} />} onClick={() => setShowAddModal(true)}>Add Crop</Button>}
      />

      {/* Top stats */}
      <Grid cols={3} gap={16}>
        <StatMini label="Total Cultivated" value={`${totalArea.toFixed(1)} ha`} />
        <StatMini label="Total Input Cost" value={`$${totalCost.toLocaleString()}`} />
        <StatMini label="Plots" value={plots.length} />
      </Grid>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16 }}>

        {/* Crop List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {crops.map(crop => (
            <div
              key={crop.id}
              onClick={() => setSelectedCropId(crop.id)}
              style={{
                padding: '12px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                background: selectedCropId === crop.id ? 'var(--color-primary)' : 'var(--color-white)',
                border: `1px solid ${selectedCropId === crop.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                boxShadow: 'var(--shadow-sm)', transition: 'all .15s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: selectedCropId === crop.id ? '#fff' : 'var(--color-text)' }}>{crop.name}</div>
                  <div style={{ fontSize: 11, color: selectedCropId === crop.id ? 'rgba(255,255,255,.7)' : 'var(--color-text-muted)', marginTop: 1 }}>{crop.variety} &bull; {crop.areaHa} ha</div>
                </div>
                <Badge
                  label={crop.status}
                  color={selectedCropId === crop.id ? '#fff' : statusColor[crop.status]}
                  bg={selectedCropId === crop.id ? 'rgba(255,255,255,.2)' : statusBg[crop.status]}
                />
              </div>
              <ProgressBar value={crop.progressPercent} color={selectedCropId === crop.id ? 'var(--color-accent)' : 'var(--color-primary)'} height={5} />
              <div style={{ fontSize: 10, color: selectedCropId === crop.id ? 'rgba(255,255,255,.6)' : 'var(--color-text-muted)', marginTop: 4, textAlign: 'right' }}>
                {crop.progressPercent}% complete
              </div>
            </div>
          ))}
        </div>

        {/* Crop Detail */}
        <Card>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)' }}>
            {(['overview', 'activity'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 20px', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  background: 'none', border: 'none',
                  borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
                  marginBottom: -1,
                }}
              >
                {tab === 'overview' ? 'Crop Overview' : `Activity Log (${cropLogs.length})`}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '0 16px' }}>
              <Button size="sm" variant="secondary" icon={<Plus size={12} />} onClick={() => setShowLogModal(true)}>
                Log Activity
              </Button>
            </div>
          </div>

          {activeTab === 'overview' ? (
            <div style={{ padding: 20 }}>
              {/* Header */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text)' }}>{selectedCrop.name}</div>
                  <Badge label={selectedCrop.status.replace('-', ' ')} color={statusColor[selectedCrop.status]} bg={statusBg[selectedCrop.status]} />
                </div>
                <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{selectedCrop.variety} &bull; Planted {selectedCrop.plantedDate} &bull; Expected harvest {selectedCrop.expectedHarvestDate}</div>
              </div>

              {/* Progress */}
              <div style={{ background: 'var(--color-gray-light)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>Growth Progress</span>
                  <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-primary)' }}>{selectedCrop.progressPercent}%</span>
                </div>
                <ProgressBar value={selectedCrop.progressPercent} color="var(--color-primary)" height={12} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--color-text-muted)', marginTop: 6 }}>
                  <span>Planting</span>
                  <span>Germination</span>
                  <span>Growth</span>
                  <span>Flowering</span>
                  <span>Harvest</span>
                </div>
              </div>

              {/* Details grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                {[
                  { icon: <MapPin size={14} />, label: 'Plot', value: `${selectedPlot.name} (${selectedPlot.soilType})` },
                  { icon: <Sprout size={14} />, label: 'Area', value: `${selectedCrop.areaHa} hectares` },
                  { icon: <Calendar size={14} />, label: 'Days to Harvest', value: `${Math.max(0, Math.floor((new Date(selectedCrop.expectedHarvestDate).getTime() - Date.now()) / 86400000))} days` },
                  { icon: <DollarSign size={14} />, label: 'Input Cost', value: `$${selectedCrop.inputCost}` },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ color: 'var(--color-primary)', marginTop: 1 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 6 }}>FIELD NOTES</div>
                <div style={{ fontSize: 13, color: 'var(--color-text)', lineHeight: 1.6, padding: '10px 12px', background: 'var(--color-gray-light)', borderRadius: 'var(--radius-md)' }}>
                  {selectedCrop.notes || 'No notes recorded.'}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {cropLogs.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No activities logged for this crop yet.
                </div>
              ) : (
                <div style={{ padding: '8px 0' }}>
                  {cropLogs.map(log => (
                    <div key={log.id} style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: 14 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: statusBg[log.type] || '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: activityTypeColor[log.type] || '#64748B' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                          <span style={{ fontWeight: 600, fontSize: 13, textTransform: 'capitalize' }}>{log.type}</span>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            {log.cost && <span style={{ fontWeight: 700, fontSize: 12, color: 'var(--color-danger)' }}>-${log.cost}</span>}
                            <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{log.date}</span>
                          </div>
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{log.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Yield History */}
      <Card>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Yield & Income History</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--color-gray-light)' }}>
                {['Month', 'Year', 'Crop', 'Yield (tonnes)', 'Income (USD)'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.4px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {yieldHistory.map((r, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 600 }}>{r.month}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--color-text-muted)' }}>{r.year}</td>
                  <td style={{ padding: '10px 16px' }}>{r.cropName}</td>
                  <td style={{ padding: '10px 16px', fontWeight: 600, color: 'var(--color-primary)' }}>{r.yieldTonnes}</td>
                  <td style={{ padding: '10px 16px', fontWeight: 600, color: 'var(--color-teal)' }}>${r.incomeUSD}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function StatMini({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <div style={{ padding: '14px 18px' }}>
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-primary)' }}>{value}</div>
      </div>
    </Card>
  );
}
