import { json, type ActionFunctionArgs } from '@remix-run/node';
import invariant from 'tiny-invariant';
import mailchimp from '@mailchimp/mailchimp_marketing';

interface MailchimpError {
  title: string;
  status: number;
  detail: string;
  instance: string;
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const email = formData.get('email');
    const origin = formData.get('origin');

    // Better email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return json({ error: 'Invalid email' }, { status: 400 });
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
    const listId = process.env.MAILCHIMP_AUDIENCE_ID;

    invariant(apiKey, 'MAILCHIMP_API_KEY is not set');
    invariant(serverPrefix, 'MAILCHIMP_SERVER_PREFIX is not set');
    invariant(listId, 'MAILCHIMP_AUDIENCE_ID is not set');

    mailchimp.setConfig({
      apiKey,
      server: serverPrefix,
    });

    await mailchimp.lists.addListMember(listId, {
      email_address: email.toLowerCase(),
      status: 'pending',
      merge_fields: {
        ORIGIN: origin?.toString(),
      },
    });

    return json({ success: true }, { status: 201 });
  } catch (error: unknown) {
    console.error('Full error:', error);

    if (error instanceof Error && 'response' in error) {
      const response = error.response as { body: MailchimpError };
      if (response.body.title === 'Member Exists') {
        return json({ error: 'Member already exists' }, { status: 409 });
      }
    }

    return json({ error: 'Subscription failed' }, { status: 500 });
  }
}
