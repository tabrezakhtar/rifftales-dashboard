"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import type { ClientEquipment } from "@/types";
import EquipmentList from "@/components/equipment/EquipmentList";
import SearchInput from "@/components/SearchInput";
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress, Pagination, Stack } from "@mui/material";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface EquipmentPageClientProps {
  initialData: {
    equipment: ClientEquipment[];
    total: number;
  };
}

export default function EquipmentPageClient({ initialData }: EquipmentPageClientProps) {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "";
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");

  const isFirstRender = useRef(true);
  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const shouldUseInitialData = isFirstRender.current;

  const { data, error, isLoading } = useSWR<{
    equipment: ClientEquipment[]; total: number
  }>(`/api/equipment?page=${page}&pageSize=${pageSize}&sort=${sort}&search=${encodeURIComponent(search)}&userId=${userId}`, fetcher, { 
    fallbackData: shouldUseInitialData ? initialData : undefined,
    revalidateOnMount: !shouldUseInitialData,
    keepPreviousData: true 
  });
  
  const equipment = data?.equipment || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Equipment
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Browse all equipment in the system.
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <SearchInput
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          debounceMs={300}
          placeholder="Search by name"
          label="Search equipment"
        />
      </Box>
      
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="sort-label">Sort by date</InputLabel>
            <Select
              labelId="sort-label"
              id="sort"
              value={sort}
              label="Sort by date"
              onChange={(e) => {
                setSort(e.target.value as "asc" | "desc");
                setPage(1);
              }}
            >
              <MenuItem value="desc">Newest first</MenuItem>
              <MenuItem value="asc">Oldest first</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="pageSize-label">Items per page</InputLabel>
            <Select
              labelId="pageSize-label"
              id="pageSize"
              value={pageSize}
              label="Items per page"
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={75}>75</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={(event, value) => setPage(value)}
          color="primary"
          showFirstButton
          showLastButton
          size="small"
        />
      </Box>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>Failed to load equipment</Alert>}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && !error && <EquipmentList equipment={equipment} />}
    </Container>
  );
}
