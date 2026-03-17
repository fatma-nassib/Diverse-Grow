import React from 'react';

// ─── Card ─────────────────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}
export function Card({ children, style, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : undefined,
        transition: onClick ? 'box-shadow .15s' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accentColor?: string;
}
export function StatCard({ label, value, sub, accentColor = 'var(--color-primary)' }: StatCardProps) {
  return (
    <Card>
      <div style={{ padding: '16px 20px' }}>
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 6 }}>
          {label}
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, color: accentColor, lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>{sub}</div>}
      </div>
    </Card>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
  type?: 'button' | 'submit';
  disabled?: boolean;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}
const btnBase: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  fontWeight: 600, borderRadius: 'var(--radius-md)', border: '1px solid transparent',
  cursor: 'pointer', transition: 'all .15s', whiteSpace: 'nowrap',
};
const btnVariants: Record<string, React.CSSProperties> = {
  primary:   { background: 'var(--color-primary)',   color: '#fff', borderColor: 'var(--color-primary)' },
  secondary: { background: 'transparent', color: 'var(--color-primary)', borderColor: 'var(--color-primary)' },
  ghost:     { background: 'transparent', color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' },
  danger:    { background: 'var(--color-danger)',    color: '#fff', borderColor: 'var(--color-danger)' },
};
const btnSizes: Record<string, React.CSSProperties> = {
  sm: { padding: '5px 12px', fontSize: 12 },
  md: { padding: '8px 16px', fontSize: 13.5 },
};
export function Button({ children, onClick, variant = 'primary', size = 'md', type = 'button', disabled, style, icon }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...btnBase, ...btnVariants[variant], ...btnSizes[size], opacity: disabled ? .5 : 1, ...style }}
    >
      {icon}{children}
    </button>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
interface BadgeProps {
  label: string;
  color?: string;
  bg?: string;
}
export function Badge({ label, color = 'var(--color-primary)', bg = 'rgba(44,95,45,.1)' }: BadgeProps) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 20,
      fontSize: 11, fontWeight: 600, color, background: bg, whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
interface ProgressProps {
  value: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
}
export function ProgressBar({ value, color = 'var(--color-primary)', height = 8, showLabel = false }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, background: '#E2E8F0', borderRadius: 99, height, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 99, transition: 'width .3s' }} />
      </div>
      {showLabel && <span style={{ fontSize: 12, color: 'var(--color-text-muted)', width: 30, textAlign: 'right' }}>{pct}%</span>}
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}
export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
      <div>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.2 }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginTop: 2 }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
interface InputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}
export function Input({ label, value, onChange, type = 'text', placeholder, required, error }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)' }}>
        {label}{required && <span style={{ color: 'var(--color-danger)' }}> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          padding: '8px 12px', borderRadius: 'var(--radius-md)',
          border: `1px solid ${error ? 'var(--color-danger)' : 'var(--color-border)'}`,
          background: 'var(--color-white)', outline: 'none', fontSize: 13.5,
          color: 'var(--color-text)',
        }}
      />
      {error && <span style={{ fontSize: 11, color: 'var(--color-danger)' }}>{error}</span>}
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
interface TextareaProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}
export function Textarea({ label, value, onChange, placeholder, required, rows = 3 }: TextareaProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)' }}>
        {label}{required && <span style={{ color: 'var(--color-danger)' }}> *</span>}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        style={{
          padding: '8px 12px', borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)', background: 'var(--color-white)',
          outline: 'none', fontSize: 13.5, color: 'var(--color-text)', resize: 'vertical',
        }}
      />
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
interface SelectProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}
export function Select({ label, value, onChange, options, placeholder, required }: SelectProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)' }}>
        {label}{required && <span style={{ color: 'var(--color-danger)' }}> *</span>}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        style={{
          padding: '8px 12px', borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)', background: 'var(--color-white)',
          outline: 'none', fontSize: 13.5, color: value ? 'var(--color-text)' : 'var(--color-text-muted)',
          cursor: 'pointer',
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
interface EmptyStateProps { title: string; description?: string; action?: React.ReactNode; }
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-gray-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--color-border)' }} />
      </div>
      <div style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: 4 }}>{title}</div>
      {description && <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 16 }}>{description}</div>}
      {action}
    </div>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────
interface GridProps { children: React.ReactNode; cols?: number; gap?: number; style?: React.CSSProperties; }
export function Grid({ children, cols = 3, gap = 16, style }: GridProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, ...style }}>
      {children}
    </div>
  );
}

// ─── Tag chip ─────────────────────────────────────────────────────────────────
interface TagProps { label: string; active?: boolean; onClick?: () => void; }
export function Tag({ label, active, onClick }: TagProps) {
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-block', padding: '4px 12px', borderRadius: 99,
        fontSize: 12, fontWeight: 500, cursor: onClick ? 'pointer' : 'default',
        background: active ? 'var(--color-primary)' : '#F1F5F4',
        color: active ? '#fff' : 'var(--color-text-muted)',
        transition: 'all .15s', border: active ? '1px solid var(--color-primary)' : '1px solid transparent',
      }}
    >
      {label}
    </span>
  );
}
