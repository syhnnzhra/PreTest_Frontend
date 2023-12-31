import AddBook from "./addBook";
import DeleteBook from "./deleteBook";
import UpdateBook from "./updateBook";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/sessionConfig";

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
};

//getting token from session
async function getIronSessionData() {
    const session = await getIronSession<SessionData>(
        cookies(),
        sessionOptions
    );
    return session.token;
}
async function getBooks() {
    const token = await getIronSessionData();
    const res = await fetch(`${process.env.SERVER_PUBIC_URL}/api/books`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        //ambil data setiap request
        // cache: 'no-store',
        next: { revalidate: 10 },
    });
    return res.json();
}

export default async function BookList() {
    try {
        const books: { data?: Book[] } = await getBooks(); // Ensure 'data' is optional
        // console.log('Books:', books);

        return (
            <div className="px-10 py-10">
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
                        {books.data?.map((book, index) => (
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
                                    <UpdateBook {...book} />
                                    <DeleteBook {...book} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } catch (error) {
        console.error("Error fetching books:", error);
        // Handle the error, e.g., display an error message or redirect
        return <div>Error fetching books</div>;
    }
}
