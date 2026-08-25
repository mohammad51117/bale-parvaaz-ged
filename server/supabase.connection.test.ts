import { describe, expect, it } from "vitest";

describe("Supabase connection", () => {
  it("accepts the configured publishable key at the REST endpoint", async () => {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    expect(url).toBeTruthy();
    expect(key).toBeTruthy();

    const response = await fetch(`${url}/rest/v1/ged_books?select=id&limit=1`, {
      headers: {
        apikey: key!,
        Authorization: `Bearer ${key!}`,
      },
    });

    expect(response.status).toBe(200);
  }, 15_000);

  it("accepts the configured service role key at the Storage endpoint", async () => {
    const url = process.env.VITE_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.replace(/\\s/g, "");

    expect(url).toBeTruthy();
    expect(serviceRoleKey).toBeTruthy();

    const response = await fetch(`${url}/storage/v1/bucket`, {
      headers: {
        apikey: serviceRoleKey!,
        Authorization: `Bearer ${serviceRoleKey!}`,
      },
    });

    expect(response.status).toBe(200);
  }, 15_000);
});
