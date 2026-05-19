import { useQuery } from "@tanstack/react-query";
import { getAllMessages } from "../../../../shared/lib/api";
import { QUERYKEYS } from "../constant";

export const useMessages = () =>
  useQuery({
    queryKey: [QUERYKEYS.message],
    queryFn: getAllMessages,
  });
