export interface PaginationPropsInterface {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}