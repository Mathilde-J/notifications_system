import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../../../../shared/lib/api";
import { QUERYKEYS } from "../constant";

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.message],
      });
    },
  });

  return mutation;
};
