import AddBook from "./addBook";
import DeleteBook from "./deleteBook";
import UpdateBook from "./updateBook";

type Book = {
    id: string;
    user_id: string;
    isbn: string;
    title: string; 
    subtitle: string;
    author: string;
    published: Date;
    publisher: string;
    pages: string;
    description: string;
    website: string;
    created_at: Date;
    updated_at: Date;
}
async function getBooks(){
    const res = await fetch('https://book-crud-service-6dmqxfovfq-et.a.run.app/api/books', {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer 486|CO1jlj37t0RzeqnbGhCSlXsMgdpKvG9aFsF8eTbE'
        },
        //ambil data setiap request
        // cache: 'no-store',
        next: { revalidate:10 },
    });
    return res.json();
}

export default async function BookList() {
    const books: Book[] = await getBooks();
    console.log('Books:', books);
    return (
        <div className="py-10 px-10">
            <div className="py-2">
                <AddBook />
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>no</th>
                        <th>isbn</th>
                        <th>title</th>
                        <th>subtitle</th>
                        <th>author</th>
                        <th>published</th>
                        <th>pages</th>
                        <th>description</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.data.map((book, index) => (
                        <tr key={book.id}>
                            <td>{index + 1}</td>
                            <td>{book.isbn}</td>
                            <td>{book.title}</td>
                            <td>{book.subtitle}</td>
                            <td>{book.author}</td>
                            <td>{book.published}</td>
                            <td>{book.pages}</td>
                            <td>{book.description}</td>
                            <td className="flex">
                                <UpdateBook {...book}/>
                                <DeleteBook {...book}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}