import React, { useState } from 'react';
import { Search, Plus, Filter, MapPin, Package, Phone, X, CheckCircle } from 'lucide-react';
import { Card, Button, Badge, SectionHeader, Input, Textarea, Select, Tag, Grid } from './ui';
import { listings as initialListings } from '../data/mockData';
import type { Listing, ProduceCategory, NewListingForm, Screen } from '../types';

interface Props { onNavigate: (s: Screen) => void; }

const CATEGORY_OPTIONS: { value: ProduceCategory | 'all'; label: string }[] = [
  { value: 'all',       label: 'All Categories' },
  { value: 'grains',    label: 'Grains & Cereals' },
  { value: 'vegetables',label: 'Vegetables' },
  { value: 'fruits',    label: 'Fruits' },
  { value: 'livestock', label: 'Livestock' },
  { value: 'dairy',     label: 'Dairy' },
  { value: 'inputs',    label: 'Agricultural Inputs' },
];

const categoryLabel: Record<string, string> = {
  grains:'Grains', vegetables:'Vegetables', fruits:'Fruits',
  livestock:'Livestock', dairy:'Dairy', inputs:'Inputs',
};

const DELIVERY_OPTIONS = ['Pickup', 'Delivery within 30km', 'Delivery within 50km', 'Delivery within 100km', 'Freight available'];

// ─── Listing Card ─────────────────────────────────────────────────────────────
function ListingCard({ listing, onContact }: { listing: Listing; onContact: (l: Listing) => void }) {
  return (
    <Card style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Colour header */}
      <div style={{ height: 6, background: listing.imageColor }} />
      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2, lineHeight: 1.3 }}>{listing.title}</div>
            <Badge label={categoryLabel[listing.category] || listing.category} color={listing.imageColor} bg={`${listing.imageColor}18`} />
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-primary)' }}>${listing.pricePerUnit}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>per {listing.unit}</div>
          </div>
        </div>
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', lineHeight: 1.5, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {listing.description}
        </p>
        <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--color-text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Package size={12} />{listing.quantityAvailable} {listing.unit}s available
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <MapPin size={12} />{listing.sellerLocation}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {listing.deliveryOptions.map(d => (
            <span key={d} style={{ fontSize: 11, background: 'var(--color-gray-light)', color: 'var(--color-text-muted)', padding: '2px 8px', borderRadius: 4 }}>{d}</span>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{listing.sellerName}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{listing.sellerCooperative}</div>
          </div>
          <Button size="sm" onClick={() => onContact(listing)} icon={<Phone size={12} />}>Contact Seller</Button>
        </div>
      </div>
    </Card>
  );
}

// ─── Contact Modal ────────────────────────────────────────────────────────────
function ContactModal({ listing, onClose }: { listing: Listing; onClose: () => void }) {
  const [msg, setMsg] = useState(`Hello ${listing.sellerName},\n\nI am interested in your listing "${listing.title}". Please share more details on availability and delivery options.\n\nThank you.`);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 380, padding: 32, textAlign: 'center' }}>
          <CheckCircle size={48} color="var(--color-primary)" style={{ margin: '0 auto 12px' }} />
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Inquiry Sent</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 20 }}>Your message has been sent to {listing.sellerName}. They will contact you directly.</div>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 440, boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Contact Seller</div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', fontSize: 20, cursor: 'pointer', background: 'none', border: 'none' }}>×</button>
        </div>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: 'var(--color-gray-light)', borderRadius: 'var(--radius-md)', padding: '10px 14px' }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{listing.title}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{listing.sellerName} &bull; {listing.sellerCooperative}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)' }}>Your Message</label>
            <textarea
              value={msg}
              onChange={e => setMsg(e.target.value)}
              rows={5}
              style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={() => setSent(true)} disabled={!msg.trim()} icon={<Phone size={13} />}>Send Inquiry</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Post Listing Form ────────────────────────────────────────────────────────
function PostListing({ onBack, onSuccess }: { onBack: () => void; onSuccess: (l: Listing) => void }) {
  const [form, setForm] = useState<NewListingForm>({
    title: '', category: '', description: '', pricePerUnit: '', unit: '',
    quantityAvailable: '', deliveryOptions: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof NewListingForm, string>>>({});

  const set = (k: keyof NewListingForm) => (v: string) => setForm(f => ({ ...f, [k]: v }));
  const toggleDelivery = (opt: string) =>
    setForm(f => ({ ...f, deliveryOptions: f.deliveryOptions.includes(opt) ? f.deliveryOptions.filter(x => x !== opt) : [...f.deliveryOptions, opt] }));

  const validate = (): boolean => {
    const e: Partial<Record<keyof NewListingForm, string>> = {};
    if (!form.title) e.title = 'Title is required';
    if (!form.category) e.category = 'Category is required';
    if (!form.description) e.description = 'Description is required';
    if (!form.pricePerUnit || isNaN(Number(form.pricePerUnit))) e.pricePerUnit = 'Valid price is required';
    if (!form.unit) e.unit = 'Unit is required';
    if (!form.quantityAvailable || isNaN(Number(form.quantityAvailable))) e.quantityAvailable = 'Quantity is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const colors: Record<string, string> = { grains:'#2C5F2D', vegetables:'#C0392B', fruits:'#E6A817', livestock:'#028090', dairy:'#4A8C4B', inputs:'#64748B' };
    const newListing: Listing = {
      id: `l${Date.now()}`, sellerId: 'u1', sellerName: 'Ashley Ntaimo',
      sellerCooperative: 'Lusaka Smallholders Coop', sellerLocation: 'Lusaka, Zambia',
      title: form.title, category: form.category as ProduceCategory,
      description: form.description, pricePerUnit: Number(form.pricePerUnit),
      unit: form.unit, quantityAvailable: Number(form.quantityAvailable),
      deliveryOptions: form.deliveryOptions.length ? form.deliveryOptions : ['Pickup'],
      imageColor: colors[form.category] || '#2C5F2D',
      status: 'active', postedAt: new Date().toISOString().slice(0, 10),
      expiresAt: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
    };
    setSubmitted(true);
    setTimeout(() => onSuccess(newListing), 1500);
  };

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, gap: 12 }}>
        <CheckCircle size={56} color="var(--color-primary)" />
        <div style={{ fontSize: 20, fontWeight: 700 }}>Listing Published</div>
        <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Your listing is now live on the marketplace.</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 680 }}>
      <SectionHeader
        title="Post a Listing"
        subtitle="List your produce to connect directly with buyers across the network"
        action={<Button variant="ghost" onClick={onBack} icon={<X size={14} />}>Cancel</Button>}
      />
      <Card>
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Input label="Listing Title" value={form.title} onChange={set('title')} placeholder="e.g. White Maize — Grade A, 50kg bags" required error={errors.title} />

          <Grid cols={2} gap={16}>
            <Select label="Category" value={form.category} onChange={set('category')} placeholder="Select a category" required
              options={CATEGORY_OPTIONS.filter(o => o.value !== 'all').map(o => ({ value: o.value, label: o.label }))}
            />
            <Input label="Unit of Sale" value={form.unit} onChange={set('unit')} placeholder="e.g. 50kg bag, crate, litre" required error={errors.unit} />
          </Grid>

          <Grid cols={2} gap={16}>
            <Input label="Price per Unit (USD)" value={form.pricePerUnit} onChange={set('pricePerUnit')} type="number" placeholder="0.00" required error={errors.pricePerUnit} />
            <Input label="Quantity Available" value={form.quantityAvailable} onChange={set('quantityAvailable')} type="number" placeholder="e.g. 200" required error={errors.quantityAvailable} />
          </Grid>

          <Textarea label="Description" value={form.description} onChange={set('description')} required rows={4}
            placeholder="Include: variety, grade, moisture content, harvest date, packaging, certifications..." />

          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 8 }}>DELIVERY OPTIONS</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {DELIVERY_OPTIONS.map(opt => (
                <Tag key={opt} label={opt} active={form.deliveryOptions.includes(opt)} onClick={() => toggleDelivery(opt)} />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', paddingTop: 4 }}>
            <Button variant="ghost" onClick={onBack}>Cancel</Button>
            <Button onClick={handleSubmit} icon={<Plus size={14} />}>Publish Listing</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Main Marketplace ─────────────────────────────────────────────────────────
export default function Marketplace({ onNavigate }: Props) {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | ProduceCategory>('all');
  const [posting, setPosting] = useState(false);
  const [contactListing, setContactListing] = useState<Listing | null>(null);

  if (posting) {
    return (
      <PostListing
        onBack={() => setPosting(false)}
        onSuccess={l => { setListings(prev => [l, ...prev]); setPosting(false); }}
      />
    );
  }

  const filtered = listings.filter(l => {
    const matchCat = category === 'all' || l.category === category;
    const matchSearch = !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.description.toLowerCase().includes(search.toLowerCase()) || l.sellerLocation.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {contactListing && <ContactModal listing={contactListing} onClose={() => setContactListing(null)} />}

      <SectionHeader
        title="Digital Marketplace"
        subtitle={`${listings.filter(l => l.status === 'active').length} active listings from cooperatives across Zambia and Tanzania`}
        action={<Button icon={<Plus size={14} />} onClick={() => setPosting(true)}>Post a Listing</Button>}
      />

      {/* Search & Filter bar */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 380 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search produce, location, seller..."
            style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: 13, outline: 'none', background: 'var(--color-white)' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATEGORY_OPTIONS.map(opt => (
            <Tag key={opt.value} label={opt.label} active={category === opt.value} onClick={() => setCategory(opt.value as typeof category)} />
          ))}
        </div>
      </div>

      {/* Results count */}
      <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
        Showing {filtered.length} listing{filtered.length !== 1 ? 's' : ''}
        {search && ` for "${search}"`}
        {category !== 'all' && ` in ${categoryLabel[category]}`}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-text-muted)' }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>No listings found</div>
          <div style={{ fontSize: 13 }}>Try adjusting your search or filters, or post your own listing.</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {filtered.map(l => <ListingCard key={l.id} listing={l} onContact={setContactListing} />)}
        </div>
      )}
    </div>
  );
}
