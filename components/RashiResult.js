'use client';
import { useEffect, useState } from 'react';
import traitsEN from '../data/zodiac_traits/moon_sign_traits_en.json';
import traitsHI from '../data/zodiac_traits/moon_sign_traits_hi.json';
import { useTranslation } from 'next-i18next';


export default function RashiResult({ sign, lang }) {
  const { i18n } = useTranslation();
  const traits = i18n.language === 'hi' ? traitsHI : traitsEN;
  const [trait, setTrait] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sign) return;
    fetch(`/api/zodiac-traits?sign=${sign}&lang=${lang}`)
      .then((resp) => resp.json())
      .then((data) => {
        setTrait(data);
        setLoading(false);
      });
  }, [sign, lang]);

  if (loading) return <p>Loading…</p>;
  if (trait?.error) return <p style={{ color: 'red' }}>{trait.error}</p>;

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center' }}>{trait.title}</h2>
      <img src={trait.image} alt={trait.symbol} style={{ display: 'block', margin: 'auto', width: 100 }} />
      <p><strong>Element:</strong> {trait.element}</p>
      <p><strong>Planet:</strong> {trait.ruling_planet}</p>
      <hr />
      <p style={{ whiteSpace: 'pre-line' }}>{trait.personality}</p>
    </div>
  );
}
