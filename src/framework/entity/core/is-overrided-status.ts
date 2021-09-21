export default function(Result: any) {
    return (typeof Result === 'object' && Result.status !== undefined && typeof Result.status === 'boolean');
}