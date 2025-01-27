declare module '@mailchimp/mailchimp_marketing' {
  interface MailchimpConfig {
    apiKey: string;
    server: string;
  }

  interface MailchimpClient {
    setConfig(config: MailchimpConfig): void;
    lists: {
      addListMember(
        listId: string,
        data: {
          email_address: string;
          status: 'subscribed' | 'pending';
          merge_fields: Record<string, string | undefined>;
        },
      ): Promise<Record<string, unknown>>;
    };
  }

  const client: MailchimpClient;
  export default client;
}
