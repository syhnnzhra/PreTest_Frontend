'use client';
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function UpdateBook(book: Book) {
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({
        isbn: (book.isbn),
        title: (book.title),
        subtitle: (book.subtitle),
        author: (book.author),
        published: (book.published),
        publisher: (book.publisher),
        pages: (book.pages),
        description: (book.description),
        website: (book.website),
    });

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleUpdate(e: SyntheticEvent) {
        e.preventDefault();
    
        try {
            setLoading(true);
            const response = await fetch(`https://book-crud-service-6dmqxfovfq-et.a.run.app/api/books/${book.id}/edit`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer 486|CO1jlj37t0RzeqnbGhCSlXsMgdpKvG9aFsF8eTbE'
                },
                body: JSON.stringify(formData),
            });
    
            
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    }
    
    

    function handleChange(){
        setModal(!modal);
    }

    function handleInputChange(e: SyntheticEvent<HTMLInputElement>) {
        const { name, value } = e.currentTarget;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'isbn' || name === 'user_id' ? parseInt(value, 10) : value,
        }));
    }

    return (
        <div>
            <button className="btn" onClick={handleChange}>
                Edit
            </button>

            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />

            {modal && (
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit {book.title}</h3>
                        <form onSubmit={handleUpdate}>
                        {Object.entries(formData).map(([field, value]) => (
                                <div key={field} className="form-control">
                                    <label className="label font-bold">{field}</label>
                                    {field === 'published' ? (
                                        <input
                                            type="date"
                                            name={field}
                                            value={value}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    ) : (
                                        <input
                                            type={field === 'isbn' || field === 'pages' ? 'number' : 'text'}
                                            name={field}
                                            value={value}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    )}
                                </div>
                            ))}
                            <div className="modal-action">
                                <button type="button" className="btn" onClick={handleChange}>
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}