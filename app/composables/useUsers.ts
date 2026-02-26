import type { User } from "@/models/user.model";
import { fetchUsers } from "@/services/user.service";
import { useToastStore } from "@/stores/taost";
import { useLoadingStore } from "~/stores/loading";

export function useUsers() {
  const users = ref<User[]>([]);
  
  const toast = useToastStore();
  const load = useLoadingStore();

  const getUsers = async () => {
    load.startLoad();
    try {
      users.value = await fetchUsers();
      toast.show('Get users successed.', 'success');
    } catch(err) {
      toast.show('Failed to get users.', 'error');
    } finally {
      load.endLoad();
    }
  }

  onMounted( async () => {
    await getUsers();
  })

  return {
    users,
    reload: getUsers
  }
}