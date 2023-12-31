'use client';
import { useState } from "react";
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

export default function DeleteBook(book: Book) {
    const [modal, setModal] = useState(false);

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleDelete(bookId: number) {    
        try {
            setLoading(true);
            const response = await fetch(`https://book-crud-service-6dmqxfovfq-et.a.run.app/api/books/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 486|CO1jlj37t0RzeqnbGhCSlXsMgdpKvG9aFsF8eTbE'
                },
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

    // function handleInputChange(e: SyntheticEvent<HTMLInputElement>) {
    //     const { name, value } = e.currentTarget;
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: name === 'isbn' || name === 'user_id' ? parseInt(value, 10) : value,
    //     }));
    // }

    return (
        <div>
            <button className="btn btn-error btn-small" onClick={handleChange}>
                Delete
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
                        <h3 className="font-bold text-lg">Delete {book.title}?</h3>
                        
                            <div className="modal-action">
                                <button type="button" className="btn" onClick={handleChange}>
                                    Close
                                </button>
                                <button type="submit" onChange={()=> handleDelete(bookId)} className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                    </div>
                </div>
            )}
        </div>
    );
}