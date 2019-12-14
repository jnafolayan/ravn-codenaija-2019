
export default function({Schema, model, Url}){
    const feedSchema = Schema({
        title: {type: String, required: true},
        location: {
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ['Point'], // 'location.type' must be 'Point'
                required: true,
                default: "Point"
            },
            coordinates: {
                index: '2dsphere',
                type: [Number],
                required: true
            }
        },
        description: {type: String, required: true},
        category: {type: String, enum: ["Environment", "Security", "Fatality", "Aid", "Quality Control"], required: true},
        isApproved: {type: Boolean}
    });
    return model('Feeds', feedSchema);
};