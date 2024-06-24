import supabase from "./supabase";

export async function createComment(comment) {
  const { data, error } = await supabase
    .from("comments")
    .insert([comment])
    .select();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function getCommentsOnPost(postId) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function deleteComment(id) {
  const { data, error } = await supabase.from("comments").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
