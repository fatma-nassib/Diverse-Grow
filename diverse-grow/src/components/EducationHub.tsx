import React, { useState } from 'react';
import { Search, Clock, BookOpen, ChevronRight, ArrowLeft, Tag as TagIcon, User, Calendar } from 'lucide-react';
import { Card, SectionHeader, Tag, Button, Badge } from './ui';
import { articles } from '../data/mockData';
import type { Article, ArticleCategory } from '../types';

const CATEGORIES: { value: 'all' | ArticleCategory; label: string }[] = [
  { value: 'all',         label: 'All Topics' },
  { value: 'soil',        label: 'Soil Health' },
  { value: 'pests',       label: 'Pest Management' },
  { value: 'harvest',     label: 'Harvest & Storage' },
  { value: 'market',      label: 'Market Access' },
  { value: 'cooperative', label: 'Cooperative Governance' },
  { value: 'irrigation',  label: 'Irrigation' },
];

const catColor: Record<string, { color: string; bg: string }> = {
  soil:        { color: '#92400E', bg: '#FEF3C7' },
  pests:       { color: '#991B1B', bg: '#FEE2E2' },
  harvest:     { color: '#5B21B6', bg: '#EDE9FE' },
  market:      { color: '#065F46', bg: '#D1FAE5' },
  cooperative: { color: '#1E40AF', bg: '#DBEAFE' },
  irrigation:  { color: '#0369A1', bg: '#E0F2FE' },
};

// ─── Article Detail ───────────────────────────────────────────────────────────
function ArticleDetail({ article, onBack }: { article: Article; onBack: () => void }) {
  const cc = catColor[article.category] || { color: 'var(--color-primary)', bg: 'var(--color-gray-light)' };

  // Render markdown-like bold text
  const renderBody = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h3 key={i} style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-primary)', margin: '16px 0 6px' }}>{line.slice(2, -2)}</h3>;
      }
      if (line.trim() === '') {
        return <div key={i} style={{ height: 6 }} />;
      }
      if (/^\d+\./.test(line)) {
        return <div key={i} style={{ paddingLeft: 16, fontSize: 13.5, lineHeight: 1.7, color: 'var(--color-text)', display: 'flex', gap: 8 }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: 700, flexShrink: 0 }}>{line.match(/^(\d+\.)/)?.[1]}</span>
          <span>{line.replace(/^\d+\.\s*/, '')}</span>
        </div>;
      }
      if (line.startsWith('- ')) {
        return <div key={i} style={{ paddingLeft: 16, fontSize: 13.5, lineHeight: 1.7, color: 'var(--color-text)', display: 'flex', gap: 8 }}>
          <span style={{ color: 'var(--color-primary)', marginTop: 6 }}>&#9679;</span>
          <span>{line.slice(2)}</span>
        </div>;
      }
      return <p key={i} style={{ fontSize: 13.5, lineHeight: 1.75, color: 'var(--color-text)' }}>{line}</p>;
    });
  };

  return (
    <div style={{ maxWidth: 720 }}>
      <Button variant="ghost" size="sm" onClick={onBack} icon={<ArrowLeft size={14} />} style={{ marginBottom: 16 }}>
        Back to Education Hub
      </Button>

      <Card>
        <div style={{ height: 5, background: cc.color }} />
        <div style={{ padding: '28px 32px' }}>
          <div style={{ marginBottom: 16 }}>
            <Badge label={CATEGORIES.find(c => c.value === article.category)?.label || article.category} color={cc.color} bg={cc.bg} />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.3, marginBottom: 12, color: 'var(--color-text)' }}>
            {article.title}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 20 }}>
            {article.summary}
          </p>

          {/* Meta row */}
          <div style={{ display: 'flex', gap: 20, padding: '14px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--color-text-muted)' }}>
              <User size={13} /> {article.author}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--color-text-muted)' }}>
              <Calendar size={13} /> {article.publishedAt}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--color-text-muted)' }}>
              <Clock size={13} /> {article.readTimeMin} min read
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--color-text-muted)' }}>
              <BookOpen size={13} /> {article.reads} reads
            </div>
          </div>

          {/* Body */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {renderBody(article.body)}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: 12, color: 'var(--color-text-muted)', fontWeight: 600, alignSelf: 'center' }}>Tags:</span>
            {article.tags.map(t => (
              <span key={t} style={{ fontSize: 11, background: 'var(--color-gray-light)', color: 'var(--color-text-muted)', padding: '3px 10px', borderRadius: 99 }}>{t}</span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Article Card ─────────────────────────────────────────────────────────────
function ArticleCard({ article, onClick }: { article: Article; onClick: () => void }) {
  const cc = catColor[article.category] || { color: 'var(--color-primary)', bg: 'var(--color-gray-light)' };
  return (
    <Card onClick={onClick} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 4, background: cc.color }} />
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Badge label={CATEGORIES.find(c => c.value === article.category)?.label || article.category} color={cc.color} bg={cc.bg} />
        <h3 style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4, color: 'var(--color-text)', flex: 1 }}>{article.title}</h3>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {article.summary}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6, borderTop: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--color-text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={11} /> {article.readTimeMin} min</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><BookOpen size={11} /> {article.reads} reads</span>
          </div>
          <ChevronRight size={14} color="var(--color-primary)" />
        </div>
      </div>
    </Card>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EducationHub() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | ArticleCategory>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  if (selectedArticle) {
    return <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
  }

  const filtered = articles.filter(a => {
    const matchCat = category === 'all' || a.category === category;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase()) || a.tags.some((t: string) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <SectionHeader
        title="Education Hub"
        subtitle={`${articles.length} articles on sustainable farming, market access, and cooperative governance`}
      />

      {/* Search */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '0 0 320px' }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search articles, tags..."
            style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: 13, outline: 'none', background: 'var(--color-white)' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <Tag key={cat.value} label={cat.label} active={category === cat.value} onClick={() => setCategory(cat.value as typeof category)} />
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--color-text-muted)' }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>No articles found</div>
          <div style={{ fontSize: 13 }}>Try different search terms or browse all topics.</div>
        </div>
      ) : (
        <>
          {/* Featured */}
          {featured && !search && category === 'all' && (
            <Card onClick={() => setSelectedArticle(featured)} style={{ cursor: 'pointer' }}>
              <div style={{ height: 5, background: catColor[featured.category]?.color || 'var(--color-primary)' }} />
              <div style={{ padding: '20px 24px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'center' }}>
                    <Badge label="Featured" color="var(--color-gold)" bg="rgba(230,168,23,.12)" />
                    <Badge label={CATEGORIES.find(c => c.value === featured.category)?.label || featured.category} color={catColor[featured.category]?.color} bg={catColor[featured.category]?.bg} />
                  </div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, lineHeight: 1.3, color: 'var(--color-text)' }}>{featured.title}</h2>
                  <p style={{ fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 12 }}>{featured.summary}</p>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--color-text-muted)' }}>
                    <span>{featured.author}</span>
                    <span><Clock size={11} style={{ display: 'inline', verticalAlign: 'middle' }} /> {featured.readTimeMin} min read</span>
                    <span><BookOpen size={11} style={{ display: 'inline', verticalAlign: 'middle' }} /> {featured.reads} reads</span>
                  </div>
                </div>
                <Button variant="secondary" size="sm" icon={<ChevronRight size={13} />} style={{ flexShrink: 0 }}>Read Article</Button>
              </div>
            </Card>
          )}

          {/* Article grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {(search || category !== 'all' ? filtered : rest).map(a => (
              <ArticleCard key={a.id} article={a} onClick={() => setSelectedArticle(a)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
