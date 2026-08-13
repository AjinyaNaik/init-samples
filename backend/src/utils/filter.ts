export const hasOverlap = (
  dbValues: any,
  filterValue: string | string[] | undefined
): boolean => {
  if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) return true;
  if (!dbValues) return false;

  let dbArray: string[] = [];

  // 1. Normalize DB values
  if (typeof dbValues === "string") {
    try {
      const parsed = JSON.parse(dbValues);
      dbArray = Array.isArray(parsed) ? parsed : [dbValues];
    } catch {
      dbArray = [dbValues];
    }
  } else if (Array.isArray(dbValues)) {
    dbArray = dbValues;
  } else {
    dbArray = [String(dbValues)];
  }

  // 2. Clean up DB values
  const lowerDb = dbArray.flatMap((val) => {
    if (typeof val !== "string") return [];
    const clean = val.replace(/[\[\]"]/g, "").trim().toLowerCase();
    return clean ? [clean] : [];
  });

  // 3. Normalize filter values (support array or comma-separated query strings)
  let searchTerms: string[] = [];
  if (Array.isArray(filterValue)) {
    searchTerms = filterValue.flatMap((v) =>
      typeof v === "string" ? v.split(",").map((s) => s.trim().toLowerCase()) : []
    );
  } else if (typeof filterValue === "string") {
    searchTerms = filterValue.split(",").map((s) => s.trim().toLowerCase());
  }

  searchTerms = searchTerms.filter(Boolean);
  if (searchTerms.length === 0) return true;

  // 4. Match against terms
  return searchTerms.some((term) =>
    lowerDb.some((dbVal) => dbVal === term || dbVal.includes(term) || term.includes(dbVal))
  );
};

export const matchesFilters = (
  item: { category: string[]; sample_type: string[]; genres: string[] | null; is_selling: boolean },
  filters: { 
    category?: string | string[]; 
    sample_type?: string | string[]; 
    genre?: string | string[] 
  }
): boolean => {
  if (!item.is_selling) return false;

  return (
    hasOverlap(item.category, filters.category) &&
    hasOverlap(item.sample_type, filters.sample_type) &&
    hasOverlap(item.genres, filters.genre)
  );
};