import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useVote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (yes: boolean) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      await actor.vote(yes);
    },
    onSuccess: () => {
      // Invalidate any vote-related queries when they're added
      queryClient.invalidateQueries({ queryKey: ['votes'] });
    },
  });
}
