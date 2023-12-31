interface BooksDetailProps {
  params: {
    book_id: string;
  };
}

export default function BooksDetail({ params }: BooksDetailProps) {
  return (
    <h1>Edit Book: {params.book_id[0]}</h1>
  );
}