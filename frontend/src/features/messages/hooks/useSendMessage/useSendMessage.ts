import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../../../../shared/lib/api";
import { QUERYKEYS } from "../constant";

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  // Unlike queries, mutations are typically used to create/update/delete data or perform server side-effects. For this purpose, TanStack Query exports a useMutation hook.
  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: async () => {
      // invalidateQueries utilisé avec une key pour rafraichir les données liées à cette key
      await queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.message],
      });
    },
  });

  return mutation;
};
