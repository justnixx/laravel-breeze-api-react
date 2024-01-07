export default function Generic({ message }: { message: string }) {
  return (
    <div className="bg-red-100 text-red-600 border border-red-200 p-4 max-w-80 mx-auto my-10 rounded-md">
      {message}
    </div>
  );
}
