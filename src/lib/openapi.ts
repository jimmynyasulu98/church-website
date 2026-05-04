import { siteConfig } from "@/lib/site";

export const openApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "CCAP Zomba API",
    version: "0.1.0",
    description:
      "API documentation for CCAP Zomba content, authentication, giving receipts, membership requests, contact messages and member verification.",
    contact: {
      name: siteConfig.name,
      email: siteConfig.email,
    },
  },
  servers: [
    {
      url: siteConfig.url,
      description: "Production",
    },
    {
      url: "http://localhost:3000",
      description: "Local development",
    },
  ],
  tags: [
    { name: "Health" },
    { name: "Auth" },
    { name: "Content" },
    { name: "Giving" },
    { name: "Membership" },
    { name: "Contact" },
    { name: "Verification" },
  ],
  paths: {
    "/api/health": {
      get: {
        tags: ["Health"],
        summary: "Check API and database health",
        responses: {
          "200": {
            description: "API and database are healthy.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HealthResponse" },
              },
            },
          },
          "503": { $ref: "#/components/responses/Error" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Sign in a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Authenticated user and session cookie.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthUserResponse" },
              },
            },
          },
          "401": { $ref: "#/components/responses/Error" },
        },
      },
    },
    "/api/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Sign out the current user",
        responses: {
          "200": {
            description: "Session cleared.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LogoutResponse" },
              },
            },
          },
        },
      },
    },
    "/api/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get the current signed-in user",
        security: [{ cookieAuth: [] }],
        responses: {
          "200": {
            description: "Current user profile.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthUserResponse" },
              },
            },
          },
          "401": { $ref: "#/components/responses/Error" },
        },
      },
    },
    "/api/v1/content/{type}": {
      get: {
        tags: ["Content"],
        summary: "List published church content",
        parameters: [
          { $ref: "#/components/parameters/ContentType" },
          { $ref: "#/components/parameters/ChurchSlug" },
        ],
        responses: {
          "200": {
            description:
              "A list of events, news, sermons, mlaga schedules or vacancies.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ListResponse" },
              },
            },
          },
          "404": { $ref: "#/components/responses/Error" },
        },
      },
      post: {
        tags: ["Content"],
        summary: "Create church content",
        description:
          "Requires an authenticated STAFF or ADMIN user. Request body depends on the selected content type.",
        security: [{ cookieAuth: [] }],
        parameters: [{ $ref: "#/components/parameters/ContentType" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                oneOf: [
                  { $ref: "#/components/schemas/EventInput" },
                  { $ref: "#/components/schemas/NewsInput" },
                  { $ref: "#/components/schemas/SermonInput" },
                  { $ref: "#/components/schemas/MlagaInput" },
                  { $ref: "#/components/schemas/VacancyInput" },
                ],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Created content item.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ObjectResponse" },
              },
            },
          },
          "403": { $ref: "#/components/responses/Error" },
        },
      },
    },
    "/api/v1/giving/receipts": {
      post: {
        tags: ["Giving"],
        summary: "Submit an offering receipt record",
        description:
          "Stores receipt metadata. File storage should upload the file separately and send receiptUrl here.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/GivingReceiptInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Receipt submitted.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ObjectResponse" },
              },
            },
          },
          "400": { $ref: "#/components/responses/Error" },
        },
      },
    },
    "/api/v1/join-requests": {
      post: {
        tags: ["Membership"],
        summary: "Submit a request to join the church",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/JoinRequestInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Join request submitted.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ObjectResponse" },
              },
            },
          },
          "400": { $ref: "#/components/responses/Error" },
        },
      },
    },
    "/api/v1/contact-messages": {
      post: {
        tags: ["Contact"],
        summary: "Submit a contact message",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ContactMessageInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Contact message submitted.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ObjectResponse" },
              },
            },
          },
          "400": { $ref: "#/components/responses/Error" },
        },
      },
    },
    "/api/v1/member-verifications": {
      post: {
        tags: ["Verification"],
        summary: "Verify whether a member belongs to this church",
        description:
          "Designed for future church-to-church verification. Send x-verify-secret when VERIFY_API_SECRET is configured.",
        security: [{ verifySecret: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MemberVerificationInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Verification result.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MemberVerificationResponse" },
              },
            },
          },
          "401": { $ref: "#/components/responses/Error" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "ccap_session",
      },
      verifySecret: {
        type: "apiKey",
        in: "header",
        name: "x-verify-secret",
      },
    },
    parameters: {
      ChurchSlug: {
        name: "churchSlug",
        in: "query",
        required: false,
        schema: { type: "string", default: "ccap-zomba" },
      },
      ContentType: {
        name: "type",
        in: "path",
        required: true,
        schema: {
          type: "string",
          enum: ["events", "news", "sermons", "mlaga", "vacancies"],
        },
      },
    },
    responses: {
      Error: {
        description: "Error response.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
    },
    schemas: {
      ApiEnvelope: {
        type: "object",
        properties: {
          ok: { type: "boolean" },
        },
        required: ["ok"],
      },
      ErrorResponse: {
        allOf: [
          { $ref: "#/components/schemas/ApiEnvelope" },
          {
            type: "object",
            properties: {
              ok: { const: false },
              error: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  details: {},
                },
                required: ["message"],
              },
            },
            required: ["error"],
          },
        ],
      },
      HealthResponse: {
        type: "object",
        properties: {
          ok: { const: true },
          data: {
            type: "object",
            properties: {
              status: { type: "string", example: "healthy" },
            },
          },
        },
      },
      ObjectResponse: {
        type: "object",
        properties: {
          ok: { const: true },
          data: { type: "object", additionalProperties: true },
        },
      },
      ListResponse: {
        type: "object",
        properties: {
          ok: { const: true },
          data: {
            type: "array",
            items: { type: "object", additionalProperties: true },
          },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 8 },
        },
      },
      AuthUserResponse: {
        type: "object",
        properties: {
          ok: { const: true },
          data: {
            type: "object",
            properties: {
              id: { type: "string" },
              email: { type: "string", format: "email" },
              role: { type: "string", enum: ["ADMIN", "STAFF", "MEMBER"] },
              firstName: { type: "string" },
              lastName: { type: "string" },
              member: { type: ["object", "null"], additionalProperties: true },
            },
          },
        },
      },
      LogoutResponse: {
        type: "object",
        properties: {
          ok: { const: true },
          data: {
            type: "object",
            properties: {
              signedOut: { type: "boolean" },
            },
          },
        },
      },
      EventInput: {
        type: "object",
        required: ["title", "slug", "description", "startsAt", "venue"],
        properties: {
          churchSlug: { type: "string", default: "ccap-zomba" },
          title: { type: "string" },
          slug: { type: "string" },
          description: { type: "string" },
          startsAt: { type: "string", format: "date-time" },
          endsAt: { type: "string", format: "date-time" },
          venue: { type: "string" },
          imageUrl: { type: "string", format: "uri" },
        },
      },
      NewsInput: {
        type: "object",
        required: ["title", "slug", "excerpt", "body"],
        properties: {
          churchSlug: { type: "string", default: "ccap-zomba" },
          title: { type: "string" },
          slug: { type: "string" },
          excerpt: { type: "string" },
          body: { type: "string" },
          imageUrl: { type: "string", format: "uri" },
          publishedAt: { type: "string", format: "date-time" },
        },
      },
      SermonInput: {
        type: "object",
        required: ["title", "slug", "passage", "preacher", "preachedAt"],
        properties: {
          churchSlug: { type: "string", default: "ccap-zomba" },
          title: { type: "string" },
          slug: { type: "string" },
          passage: { type: "string" },
          preacher: { type: "string" },
          series: { type: "string" },
          videoUrl: { type: "string", format: "uri" },
          imageUrl: { type: "string", format: "uri" },
          preachedAt: { type: "string", format: "date-time" },
        },
      },
      MlagaInput: {
        type: "object",
        required: ["host", "preacher", "venue", "startsAt"],
        properties: {
          churchSlug: { type: "string", default: "ccap-zomba" },
          districtId: { type: "string" },
          host: { type: "string" },
          preacher: { type: "string" },
          venue: { type: "string" },
          startsAt: { type: "string", format: "date-time" },
          notes: { type: "string" },
        },
      },
      VacancyInput: {
        type: "object",
        required: ["title", "slug", "type", "department", "summary"],
        properties: {
          churchSlug: { type: "string", default: "ccap-zomba" },
          title: { type: "string" },
          slug: { type: "string" },
          type: { type: "string" },
          department: { type: "string" },
          summary: { type: "string" },
          requirements: {
            type: "array",
            items: { type: "string" },
          },
          closingAt: { type: "string", format: "date-time" },
        },
      },
      GivingReceiptInput: {
        type: "object",
        required: ["fullName", "phone", "type", "amount", "receiptUrl"],
        properties: {
          churchSlug: { type: "string", default: "ccap-zomba" },
          fullName: { type: "string" },
          phone: { type: "string" },
          district: { type: "string" },
          type: {
            type: "string",
            enum: ["TITHE", "OFFERING", "PLEDGE", "THANKSGIVING", "OTHER"],
          },
          amount: { type: "number", minimum: 1 },
          receiptUrl: { type: "string" },
        },
      },
      JoinRequestInput: {
        type: "object",
        required: [
          "firstName",
          "lastName",
          "gender",
          "maritalStatus",
          "primaryPhone",
          "previousChurch",
          "currentLocation",
          "preferredService",
          "transferType",
          "transferLetterStatus",
        ],
        properties: {
          churchSlug: { type: "string", default: "ccap-zomba" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          gender: { type: "string" },
          maritalStatus: { type: "string" },
          primaryPhone: { type: "string" },
          otherPhone: { type: "string" },
          email: { type: "string", format: "email" },
          previousChurch: { type: "string" },
          currentLocation: { type: "string" },
          baptizedAt: { type: "string" },
          currentWork: { type: "string" },
          preferredService: { type: "string" },
          transferType: { type: "string", enum: ["PERMANENT", "TEMPORARY"] },
          transferLetterStatus: { type: "string" },
          transferLetterUrl: { type: "string" },
          familyMembers: { type: "string" },
          notes: { type: "string" },
        },
      },
      ContactMessageInput: {
        type: "object",
        required: ["name", "email", "subject", "message"],
        properties: {
          churchSlug: { type: "string", default: "ccap-zomba" },
          name: { type: "string" },
          phone: { type: "string" },
          email: { type: "string", format: "email" },
          subject: { type: "string" },
          message: { type: "string" },
        },
      },
      MemberVerificationInput: {
        type: "object",
        required: ["memberNumber"],
        properties: {
          churchSlug: { type: "string", default: "ccap-zomba" },
          memberNumber: { type: "string", example: "CCAPZ-0001" },
          requestingChurch: { type: "string" },
          requestRef: { type: "string" },
        },
      },
      MemberVerificationResponse: {
        type: "object",
        properties: {
          ok: { const: true },
          data: {
            type: "object",
            properties: {
              verified: { type: "boolean" },
              memberNumber: { type: "string" },
              firstName: { type: "string" },
              lastName: { type: "string" },
              district: { type: ["string", "null"] },
              joinedAt: { type: ["string", "null"], format: "date-time" },
              transferType: {
                type: ["string", "null"],
                enum: ["PERMANENT", "TEMPORARY", null],
              },
            },
          },
        },
      },
    },
  },
} as const;
