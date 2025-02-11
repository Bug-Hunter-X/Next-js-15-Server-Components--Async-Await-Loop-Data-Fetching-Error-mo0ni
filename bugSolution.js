// pages/my-page.js (server component)
export default async function MyPage() {
  const ids = [1, 2, 3, 4, 5];
  const data = await Promise.allSettled(
    ids.map(async (id) => {
      try {
        const res = await fetch(`/api/data?id=${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch data for ID ${id}`);
        }
        return res.json();
      } catch (error) {
        console.error(`Error fetching data for ID ${id}:`, error);
        return { status: 'rejected', reason: error }; //Return a rejected promise
      }
    })
  );
  const resolvedData = data.filter((result) => result.status === 'fulfilled').map((result) => result.value);
  const rejectedData = data.filter((result) => result.status === 'rejected').map((result) => result.reason);

  return (
    <div>
      <h3>Resolved Data:</h3>
      {JSON.stringify(resolvedData)}
      <h3>Rejected Data:</h3>
      {JSON.stringify(rejectedData)}
    </div>
  );
}
