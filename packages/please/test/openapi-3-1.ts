/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/pet": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description The language you prefer for messages. Supported values are en-AU, en-CA, en-GB, en-US
                 * @example en-US
                 */
                "Accept-Language"?: string;
            };
            path?: never;
            cookie: {
                /** @description Some cookie */
                cookieParam: number;
            };
        };
        /** OperationId with backslash */
        get: operations["delete\\PetById"];
        /** Update an existing pet */
        put: operations["updatePet"];
        /**
         * Add a new pet to the store
         * @description Add new pet to the store inventory.
         */
        post: operations["addPet"];
        /** OperationId with quotes */
        delete: operations["deletePetBy\"Id"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/pet/{petId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Find pet by ID
         * @description Returns a single pet
         */
        get: operations["getPetById"];
        put?: never;
        /** Updates a pet in the store with form data */
        post: operations["updatePetWithForm"];
        /** Deletes a pet */
        delete: operations["deletePet"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/pet/{petId}/uploadImage": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** uploads an image */
        post: operations["uploadFile"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/pet/findByStatus": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Finds Pets by status
         * @description Multiple status values can be provided with comma separated strings
         */
        get: operations["findPetsByStatus"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/pet/findByTags": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Finds Pets by tags
         * @deprecated
         * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
         */
        get: operations["findPetsByTags"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/store/inventory": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Returns pet inventories by status
         * @description Returns a map of status codes to quantities
         */
        get: operations["getInventory"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/store/order": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Place an order for a pet */
        post: operations["placeOrder"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/store/order/{orderId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Find purchase order by ID
         * @description For valid response try integer IDs with value <= 5 or > 10. Other values will generated exceptions
         */
        get: operations["getOrderById"];
        put?: never;
        post?: never;
        /**
         * Delete purchase order by ID
         * @description For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
         */
        delete: operations["deleteOrder"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/store/subscribe": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Subscribe to the Store events
         * @description Add subscription for a store events
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        /**
                         * Format: uri
                         * @description This URL will be called by the server when the desired event will occur
                         * @example https://myserver.com/send/callback/here
                         */
                        callbackUrl: string;
                        /**
                         * @description Event name for the subscription
                         * @example orderInProgress
                         * @enum {string}
                         */
                        eventName: "orderInProgress" | "orderShipped" | "orderDelivered";
                    };
                };
            };
            responses: {
                /** @description Successful operation */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": number[][];
                    };
                };
                /** @description Subscription added */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @example AAA-123-BBB-456 */
                            subscriptionId?: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create user
         * @description This can only be done by the logged in user.
         */
        post: operations["createUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/{username}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get user by user name */
        get: operations["getUserByName"];
        /**
         * Updated user
         * @description This can only be done by the logged in user.
         */
        put: operations["updateUser"];
        post?: never;
        /**
         * Delete user
         * @description This can only be done by the logged in user.
         */
        delete: operations["deleteUser"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/createWithArray": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Creates list of users with given input array */
        post: operations["createUsersWithArrayInput"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/createWithList": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Creates list of users with given input array */
        post: operations["createUsersWithListInput"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Logs user into the system */
        get: operations["loginUser"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Logs out current logged in user session */
        get: operations["logoutUser"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export interface webhooks {
    newPet: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * New pet
         * @description Information about a new pet in the systems
         */
        post: operations["newPet"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    myWebhook: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export interface components {
    schemas: {
        ApiResponse: {
            /** Format: int32 */
            code?: number;
            type?: string;
            message?: string;
        };
        /** @description A representation of a cat */
        Cat: Omit<components["schemas"]["Pet"], "petType"> & {
            /**
             * @description The measured skill for hunting
             * @default lazy
             * @example adventurous
             * @enum {string|boolean}
             */
            huntingSkill: "clueless" | "lazy" | "adventurous" | "aggressive";
        } & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            petType: "cat";
        };
        Category: {
            /** @description Category ID */
            id?: components["schemas"]["Id"];
            /** @description Category name */
            name?: string;
            /** @description Test Sub Category */
            sub?: {
                /** @description Dumb Property */
                prop1?: string;
            };
        };
        /** @description A representation of a dog */
        Dog: Omit<components["schemas"]["Pet"], "petType"> & {
            /**
             * Format: int32
             * @description The size of the pack the dog is from
             * @default 1
             */
            packSize: number;
        } & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            petType: "dog";
        };
        /** @description A representation of a honey bee */
        HoneyBee: Omit<components["schemas"]["Pet"], "petType"> & {
            /**
             * @description Average amount of honey produced per day in ounces
             * @example 3.14
             */
            honeyPerDay: number;
        } & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            petType: "bee";
        };
        /** Format: int64 */
        Id: number;
        Order: {
            /** @description Order ID */
            id?: components["schemas"]["Id"];
            /** @description Pet ID */
            petId?: components["schemas"]["Id"];
            /**
             * Format: int32
             * @default 1
             */
            quantity: number;
            /**
             * Format: date-time
             * @description Estimated ship date
             */
            shipDate?: string;
            /**
             * @description Order Status
             * @enum {string}
             */
            status?: "placed" | "approved" | "delivered";
            /**
             * @description Indicates whenever order was completed or not
             * @default false
             */
            readonly complete: boolean;
            /** @description Unique Request Id */
            requestId?: string;
        };
        Pet: {
            /** @description Pet ID */
            id?: components["schemas"]["Id"];
            /** @description Categories this pet belongs to */
            category?: components["schemas"]["Category"];
            /**
             * @description The name given to a pet
             * @example Guru
             */
            name: string;
            /** @description The list of URL to a cute photos featuring pet */
            photoUrls: string | number | null;
            friend?: components["schemas"]["Pet"];
            /** @description Tags attached to the pet */
            tags?: components["schemas"]["Tag"][];
            /**
             * @description Pet status in the store
             * @default pending
             * @enum {string}
             */
            status: "available" | "pending" | "sold";
            /** @description Type of a pet */
            petType?: string;
            /** @enum {integer} */
            huntingSkill?: 0 | 1 | 2;
        };
        Tag: {
            /** @description Tag ID */
            id?: components["schemas"]["Id"];
            /** @description Tag name */
            name?: string;
        };
        User: {
            id?: components["schemas"]["Id"];
            pet?: components["schemas"]["Pet"] | components["schemas"]["Tag"];
            /**
             * @description User supplied username
             * @example John78
             */
            username?: string;
            /**
             * @description User first name
             * @example John
             */
            firstName?: string;
            /**
             * @description User last name
             * @example Smith
             */
            lastName?: string;
            /**
             * Format: email
             * @description User email address
             * @example john.smith@example.com
             */
            email?: string;
            /**
             * Format: password
             * @description User password, MUST contain a mix of upper and lower case letters, as well as digits
             * @example drowssaP123
             */
            password?: string;
            /**
             * @description User phone number in international format
             * @example +1-202-555-0192
             */
            phone?: string;
            /**
             * Format: int32
             * @description User status
             */
            userStatus?: number;
            /** @description User image */
            image?: string;
            addresses?: [
                {
                    city?: string;
                    country?: string;
                    /** @description includes build/apartment number */
                    street?: string;
                },
                number
            ];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: {
        /** @description Pet object that needs to be added to the store */
        Pet: {
            content: {
                "application/json": components["schemas"]["Pet"];
                "application/xml": {
                    /** @description hooray */
                    name?: string;
                };
            };
        };
        /** @description List of user object */
        UserArray: {
            content: {
                "application/json": components["schemas"]["User"][];
            };
        };
    };
    headers: never;
    pathItems: {
        webhooks: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            get?: never;
            /**
             * Get a cat details after update
             * @description Get a cat details after update
             */
            put: operations["updatedCat"];
            /**
             * Create new cat
             * @description Info about new cat
             */
            post: operations["createdCat"];
            delete?: never;
            options?: never;
            head?: never;
            patch?: never;
            trace?: never;
        };
    };
}
export type $defs = Record<string, never>;
export interface operations {
    "delete\\PetById": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description The language you prefer for messages. Supported values are en-AU, en-CA, en-GB, en-US
                 * @example en-US
                 */
                "Accept-Language"?: string;
            };
            path?: never;
            cookie: {
                /** @description Some cookie */
                cookieParam: number;
            };
        };
        requestBody?: never;
        responses: never;
    };
    updatePet: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description The language you prefer for messages. Supported values are en-AU, en-CA, en-GB, en-US
                 * @example en-US
                 */
                "Accept-Language"?: string;
            };
            path?: never;
            cookie: {
                /** @description Some cookie */
                cookieParam: number;
            };
        };
        requestBody: components["requestBodies"]["Pet"];
        responses: {
            /** @description Invalid ID supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Pet not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation exception */
            405: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    addPet: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description The language you prefer for messages. Supported values are en-AU, en-CA, en-GB, en-US
                 * @example en-US
                 */
                "Accept-Language"?: string;
            };
            path?: never;
            cookie: {
                /** @description Some cookie */
                cookieParam: number;
            };
        };
        requestBody: components["requestBodies"]["Pet"];
        responses: {
            /** @description Invalid input */
            405: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "deletePetBy\"Id": {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description The language you prefer for messages. Supported values are en-AU, en-CA, en-GB, en-US
                 * @example en-US
                 */
                "Accept-Language"?: string;
            };
            path?: never;
            cookie: {
                /** @description Some cookie */
                cookieParam: number;
            };
        };
        requestBody?: never;
        responses: never;
    };
    getPetById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @deprecated
                 * @description ID of pet to return
                 */
                petId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"];
                    "application/xml": components["schemas"]["Pet"];
                };
            };
            /** @description Invalid ID supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Pet not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updatePetWithForm: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of pet that needs to be updated */
                petId: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/x-www-form-urlencoded": {
                    /** @description Updated name of the pet */
                    name?: string;
                    /** @description Updated status of the pet */
                    status?: string;
                };
            };
        };
        responses: {
            /** @description Invalid input */
            405: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deletePet: {
        parameters: {
            query?: never;
            header?: {
                /** @example Bearer <TOKEN> */
                api_key?: string;
            };
            path: {
                /** @description Pet id to delete */
                petId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Invalid pet value */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    uploadFile: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of pet to update */
                petId: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/octet-stream": string;
            };
        };
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiResponse"];
                };
            };
        };
    };
    findPetsByStatus: {
        parameters: {
            query: {
                /** @description Status values that need to be considered for filter */
                status: ("available" | "pending" | "sold")[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"][];
                    "application/xml": components["schemas"]["Pet"][];
                };
            };
            /** @description Invalid status value */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    findPetsByTags: {
        parameters: {
            query: {
                /** @description Tags to filter by */
                tags: string[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"][];
                    "application/xml": components["schemas"]["Pet"][];
                };
            };
            /** @description Invalid tag value */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getInventory: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        [key: string]: number;
                    };
                };
            };
        };
    };
    placeOrder: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description order placed for purchasing the pet */
        requestBody: {
            content: {
                "application/json": components["schemas"]["Order"];
            };
        };
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Order"];
                    "application/xml": components["schemas"]["Order"];
                };
            };
            /** @description Invalid Order */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getOrderById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of pet that needs to be fetched */
                orderId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Order"];
                    "application/xml": components["schemas"]["Order"];
                };
            };
            /** @description Invalid ID supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Order not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteOrder: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the order that needs to be deleted */
                orderId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Invalid ID supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Order not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Created user object */
        requestBody: {
            content: {
                "application/json": components["schemas"]["User"];
            };
        };
        responses: {
            /** @description successful operation */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getUserByName: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The name that needs to be fetched. Use user1 for testing.  */
                username: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                    "application/xml": components["schemas"]["User"];
                };
            };
            /** @description Invalid username supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description name that need to be deleted */
                username: string;
            };
            cookie?: never;
        };
        /** @description Updated user object */
        requestBody: {
            content: {
                "application/json": components["schemas"]["User"];
            };
        };
        responses: {
            /** @description Invalid user supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The name that needs to be deleted */
                username: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Invalid username supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createUsersWithArrayInput: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["UserArray"];
        responses: {
            /** @description successful operation */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createUsersWithListInput: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["UserArray"];
        responses: {
            /** @description successful operation */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    loginUser: {
        parameters: {
            query: {
                /** @description The user name for login */
                username: string;
                /** @description The password for login in clear text */
                password: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    /** @description calls per hour allowed by the user */
                    "X-Rate-Limit"?: number;
                    /** @description date in UTC when token expires */
                    "X-Expires-After"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                    "application/xml": string;
                    "text/plain": unknown;
                };
            };
            /** @description Invalid username/password supplied */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    logoutUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    newPet: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["Pet"];
            };
        };
        responses: {
            /** @description Return a 200 status to indicate that the data was received successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updatedCat: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Information about cat in the system */
        requestBody?: {
            content: {
                "multipart/form-data": components["schemas"]["Cat"];
            };
        };
        responses: {
            /** @description update Cat details */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    createdCat: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Information about cat in the system */
        requestBody?: {
            content: {
                "multipart/form-data": components["schemas"]["Cat"];
            };
        };
        responses: {
            /** @description create Cat details */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}