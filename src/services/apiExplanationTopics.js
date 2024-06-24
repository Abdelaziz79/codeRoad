import { PAGE_SIZE } from "../helper/constans";
import supabase from "./supabase";

export async function getExplanationTopics() {
  const { data, error } = await supabase.from("explanation_topics").select("*");
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function getExplanationTopicById(id) {
  const { data, error } = await supabase
    .from("explanation_topics")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function createExplanation(topic) {
  const { data, error } = await supabase
    .from("explanation_topics")
    .insert([topic])
    .select();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function updateExplanation(topic) {
  const { data, error } = await supabase
    .from("explanation_topics")
    .update(topic)
    .eq("id", topic.id)
    .select();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function deleteExplanation(id) {
  const { data, error } = await supabase
    .from("explanation_topics")
    .delete()
    .eq("id", id);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function getUserTopics(userId) {
  const { data, error } = await supabase
    .from("explanation_topics")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function getVerifiedTopics({ search, level, page }) {
  // search , level , page

  let query = supabase
    .from("explanation_topics")
    .select("*", { count: "exact" })
    .eq("is_verified", true);

  if (search) {
    query = query.ilike("topics", `%${search}%`).ilike("title", `%${search}%`);
  }
  if (level !== "all" && level) {
    query = query.eq("level", level);
  }
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  query = query.order("created_at", { ascending: false });

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return { data, count };
}

export async function getNotVerifiedTopics() {
  const { data, error } = await supabase
    .from("explanation_topics")
    .select("*")
    .eq("is_verified", false);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function verifyTopic(id) {
  const { data, error } = await supabase
    .from("explanation_topics")
    .update({ is_verified: true })
    .eq("id", id);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function getAllTopicsNames() {
  const { data, error } = await supabase
    .from("explanation_topics")
    .select("topics")
    .eq("is_verified", true);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
