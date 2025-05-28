import prisma from "@/lib/client";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;

    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    //console.log("Webhook payload:", evt.data);

    //   Creating a user
    if (eventType === "user.created") {
      try {
        const username = evt.data.username;

        if (!username) {
          console.error("Username cannot be null.");
          return new Response("Missing username", { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (existingUser) {
          console.error("Username already exists in DB.");
          return new Response("Username already exists", { status: 400 });
        }

        await prisma.user.create({
          data: {
            id: evt.data.id,
            username: username,
            avatar: evt.data.image_url,
            cover: "/No_cover.jpg",
          },
        });
        return new Response("User created", { status: 200 });
      } catch (error) {
        console.log(error);
        return new Response("Failed to create user", { status: 500 });
      }
    }

    //   Updating a user
    if (eventType === "user.updated") {
      try {
        const username = evt.data.username;

        if (!username) {
          console.error("Username cannot be null.");
          return new Response("Missing username", { status: 400 });
        }

        await prisma.user.update({
          where: {
            id: evt.data.id,
          },
          data: {
            avatar: evt.data.image_url,
          },
        });
        return new Response("User updated", { status: 200 });
      } catch (error) {
        console.log(error);
        return new Response("Failed to update user", { status: 500 });
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
