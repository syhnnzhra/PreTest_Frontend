'use client';
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import ModalComponent from '../components/modal/ModalComponent';

export default function AddBook() {
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({
        isbn: 0,
        title: "",
        subtitle: "",
        author: "",
        published: "",
        publisher: "",
        pages: 0,
        description: "",
        website: "",
    });

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
    
        try {
            setLoading(true);
            const response = await fetch(`https://book-crud-service-6dmqxfovfq-et.a.run.app/api/books`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer 486|CO1jlj37t0RzeqnbGhCSlXsMgdpKvG9aFsF8eTbE'
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                setFormData({
                    isbn: 0,
                    title: "",
                    subtitle: "",
                    author: "",
                    published: "",
                    publisher: "",
                    pages: 0,
                    description: "",
                    website: "",
                });
                setModal(false);
                router.push('/books');
            } else {
                const responseData = await response.json();
    
                if (responseData) {
                    console.error('Failed to save data:', response.status, responseData);
                } else {
                    console.error('Failed to save data:', response.status, response.statusText);
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    }
    
    

    function handleChange(){
        // setModal(!modal);
        console.log('Before toggle - Modal state:', modal);
        setModal(!modal);
        console.log('After toggle - Modal state:', !modal);
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
            {/* <button className="rounded-full modal-toggle" onClick={handleChange} checked={modal}>
                Add New Book
            </button> */}

            <button
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => setModal(true)}
            >
                Toggle modal
            </button>

            <ModalComponent showModal={modal} closeModal={() => setModal(false)}>
                <div className="modal-box">
                <h3 className="font-bold text-lg">Add New Book</h3>
                <form onSubmit={handleSubmit}>
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
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    </div>
                </form>
                </div>
            </ModalComponent>

            {/* {modal && (
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Add New Book</h3>
                        <form onSubmit={handleSubmit}>
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
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )} */}
        </div>
    );
}