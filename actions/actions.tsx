"use server";

import { clerkClient } from "@clerk/nextjs/server";

interface Card {
  cardNo: string;
  expiry: string;
  cvv: string;
}

export async function addCard(
  cardNo: string,
  expiry: string,
  cvv: string,
  userId: string
) {
  let cards: Card[] = [];
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  if (Array.isArray(user.privateMetadata.card)) {
    cards = user.privateMetadata.card || [];
    cards.push({
      cardNo,
      expiry,
      cvv,
    });
  }

  console.log(user.privateMetadata);

  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      card: cards || [],
    },
  });
}
interface Password {
  website: string;
  username: string;
  password: string;
}

export async function addPassword(
  website: string,
  username: string,
  password: string,
  userId: string
) {
  let passwords: Password[] = [];
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  if (Array.isArray(user.privateMetadata.password)) {
    passwords = user.privateMetadata.password || [];
    passwords.push({
      website,
      username,
      password,
    });
    
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      password: passwords || [],
    },
  });
  } else {
      await client.users.updateUserMetadata(userId, {
        privateMetadata: {
          password: [
            {
              website,
              username,
              password,
            },
          ],
        },
      });
  
  }

  console.log(user.privateMetadata);

}

export async function deleteAllPrivateMetadata(userId: string) {
    const client = await clerkClient();

  await client.users.updateUserMetadata(userId, {
    privateMetadata: {},
  });

  console.log("All private metadata deleted.");
}
