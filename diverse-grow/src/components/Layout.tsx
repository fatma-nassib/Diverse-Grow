import React from 'react';
import { LayoutDashboard, Sprout, ShoppingCart, BookOpen, Users, ChevronRight } from 'lucide-react';
import type { Screen } from '../types';
import { currentUser } from '../data/mockData';

interface NavItem { id: Screen; label: string; icon: React.ReactNode; subScreens?: Screen[]; }

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard',       label: 'Dashboard',       icon: <LayoutDashboard size={18} /> },
  { id: 'farm-management', label: 'Farm Management',  icon: <Sprout size={18} /> },
  { id: 'marketplace',     label: 'Marketplace',      icon: <ShoppingCart size={18} />, subScreens: ['marketplace-post'] },
  { id: 'education',       label: 'Education Hub',    icon: <BookOpen size={18} />, subScreens: ['education-article'] },
  { id: 'cooperative',     label: 'Cooperative Hub',  icon: <Users size={18} /> },
];

interface Props { currentScreen: Screen; onNavigate: (s: Screen) => void; children: React.ReactNode; }

function getLabel(screen: Screen): { parent?: string; current: string } {
  const map: Record<Screen, { parent?: string; current: string }> = {
    'dashboard':         { current: 'Dashboard' },
    'farm-management':   { current: 'Farm Management' },
    'marketplace':       { current: 'Marketplace' },
    'marketplace-post':  { parent: 'Marketplace', current: 'Post a Listing' },
    'education':         { current: 'Education Hub' },
    'education-article': { parent: 'Education Hub', current: 'Article' },
    'cooperative':       { current: 'Cooperative Hub' },
  };
  return map[screen] ?? { current: '' };
}

function isActive(item: NavItem, screen: Screen) {
  return item.id === screen || (item.subScreens?.includes(screen) ?? false);
}

export default function Layout({ currentScreen, onNavigate, children }: Props) {
  const breadcrumb = getLabel(currentScreen);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

      {/* Sidebar */}
      <aside style={{ width: 240, flexShrink: 0, background: '#1A3C1B', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#7DC67A', letterSpacing: '-.3px' }}>DIVERSE GROW</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', marginTop: 3 }}>Smart Agricultural Platform</div>
        </div>

        <nav style={{ flex: 1, padding: '12px 0' }}>
          {NAV_ITEMS.map(item => {
            const active = isActive(item, currentScreen);
            return (
              <div
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px',
                  color: active ? '#7DC67A' : 'rgba(255,255,255,.72)',
                  background: active ? 'rgba(125,198,122,.12)' : 'transparent',
                  borderLeft: `3px solid ${active ? '#7DC67A' : 'transparent'}`,
                  fontWeight: active ? 600 : 400, fontSize: 13.5, cursor: 'pointer',
                  transition: 'all .15s',
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>

        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#4A8C4B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
            {currentUser.avatar}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>{currentUser.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', marginTop: 1 }}>{currentUser.location}</div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Topbar */}
        <header style={{ height: 52, background: '#fff', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 8, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748B' }}>
            {breadcrumb.parent && (
              <>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => onNavigate(currentScreen === 'marketplace-post' ? 'marketplace' : 'education')}
                >
                  {breadcrumb.parent}
                </span>
                <ChevronRight size={14} />
              </>
            )}
            <span style={{ color: '#1E293B', fontWeight: 600 }}>{breadcrumb.current}</span>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: '#64748B' }}>
              {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#2C5F2D', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
              {currentUser.avatar}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
