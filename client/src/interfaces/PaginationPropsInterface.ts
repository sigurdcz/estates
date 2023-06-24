export interface PaginationPropsInterface {
    page: number;
    setPage: (page: number) => void;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    estatesPerPage: number;
    setEstatesPerPage: (estatesPerPage: number) => void;
}