export default function FormError({error}) {
    return (
        <>
        {error && <p className="text-red-500">{error.message}</p>}
        </>
    )
}