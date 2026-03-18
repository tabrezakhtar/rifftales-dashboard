"use client";

import { useState, useRef, useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";
import type { ClientComment } from "@/types";
import CommentsList from "@/components/comments/CommentsList";
import SearchInput from "@/components/SearchInput";
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress, Pagination, Stack, Button } from "@mui/material";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface CommentsPageClientProps {
  initialData: {
    comments: ClientComment[];
    total: number;
  };
}

export default function CommentsPageClient({ initialData }: CommentsPageClientProps) {
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
    comments: ClientComment[]; total: number
  }>(`/api/comments?page=${page}&pageSize=${pageSize}&sort=${sort}&search=${encodeURIComponent(search)}`, fetcher, { 
    fallbackData: shouldUseInitialData ? initialData : undefined,
    revalidateOnMount: !shouldUseInitialData,
    keepPreviousData: true 
  });
  
  const comments = data?.comments || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        User Comments
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome to the comments page!
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <SearchInput
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          debounceMs={300}
          placeholder="Enter search text"
          label="Search comments"
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
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>Failed to load comments</Alert>}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && !error && <CommentsList comments={comments} />}
    </Container>
  );
}
