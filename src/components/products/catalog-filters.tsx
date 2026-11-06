'use client';

import { useRef } from 'react';

interface Option {
  slug: string;
  name: string;
  count?: number;
}

interface CatalogFiltersProps {
  brands: Option[];
  categories: Option[];
  search: string;
  brand: string;
  category: string;
}

export function CatalogFilters({
  brands,
  categories,
  search,
  brand,
  category,
}: CatalogFiltersProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const submit = () => formRef.current?.requestSubmit();

  return (
    <form ref={formRef} action="/products" method="GET">
      <h3 className="mb-[18px] text-base font-bold">☷ &nbsp;Filter Products</h3>

      <label className="mb-1.5 mt-3 block text-xs font-bold">
        Search
        <input
          type="search"
          name="search"
          defaultValue={search}
          placeholder="⌕  Part number or keyword..."
          className="mt-1.5 h-[34px] w-full rounded-[8px] border border-[#cad5df] bg-white px-2.5 text-[11px] font-normal text-[#334b61] outline-none focus:border-[#e8a928]"
        />
      </label>

      <label className="mb-1.5 mt-3 block text-xs font-bold">
        Manufacturer / OEM
        <select
          name="brand"
          defaultValue={brand}
          onChange={submit}
          className="mt-1.5 h-[34px] w-full cursor-pointer rounded-[8px] border border-[#cad5df] bg-white px-2.5 text-[11px] font-normal text-[#334b61] outline-none focus:border-[#e8a928]"
        >
          <option value="">All Manufacturers</option>
          {brands.map((item) => (
            <option key={item.slug} value={item.name}>
              {item.name} ({item.count})
            </option>
          ))}
        </select>
      </label>

      <label className="mb-1.5 mt-3 block text-xs font-bold">
        Product Category
        <select
          name="category"
          defaultValue={category}
          onChange={submit}
          className="mt-1.5 h-[34px] w-full cursor-pointer rounded-[8px] border border-[#cad5df] bg-white px-2.5 text-[11px] font-normal text-[#334b61] outline-none focus:border-[#e8a928]"
        >
          <option value="">All Categories</option>
          {categories.map((item) => (
            <option key={item.slug} value={item.name}>
              {item.name} ({item.count ?? 0})
            </option>
          ))}
        </select>
      </label>

      <p className="mb-1.5 mt-3 block text-xs font-bold">Condition</p>

      <label className="my-2.5 flex items-center gap-2 text-[11px] font-medium">
        <input type="checkbox" onChange={submit} /> New (Original)
      </label>

      <label className="my-2.5 flex items-center gap-2 text-[11px] font-medium">
        <input type="checkbox" onChange={submit} /> Overhauled / Serviceable
      </label>
    </form>
  );
}
