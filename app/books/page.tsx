import AddBook from "./addBook";
import DeleteBook from "./deleteBook";
import UpdateBook from "./updateBook";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/sessionConfig";
// import Navigation from '../components/navigation/Navigation';
import Navbar from '../components/navigation/Navbar';

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
        const books: { data?: Book[] } = await getBooks();

        return (
            <div className="">
                <Navbar />
                <div className="container mx-auto">
                    <div className="py-2">
                        <AddBook />
                    </div>
                    
                    <div className="flex flex-wrap justify-between">
                        {books.data?.map((book) => (
                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-3" key={book.id}>
                                <div className="p-5">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.title}</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{book.description}</p>
                                    <div className="mt-3 flex justify-between">
                                        <div className="flex items-center">
                                            <span className="text-gray-500">Author: {book.author}</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex justify-between">
                                        <div className="flex items-center">
                                            <span className="text-gray-500"><UpdateBook {...book} /></span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-gray-500"><DeleteBook {...book} /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching books:", error);
        return <div>Error fetching books</div>;
    }
}
