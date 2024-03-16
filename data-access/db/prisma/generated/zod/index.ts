import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput =
  | Prisma.JsonValue
  | null
  | 'JsonNull'
  | 'DbNull'
  | Prisma.NullTypes.DbNull
  | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(
  () =>
    z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
      z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
      z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
]);

export const AccountScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'type',
  'provider',
  'providerAccountId',
  'refresh_token',
  'access_token',
  'expires_at',
  'token_type',
  'scope',
  'id_token',
  'session_state',
]);

export const SessionScalarFieldEnumSchema = z.enum([
  'id',
  'sessionToken',
  'userId',
  'expires',
]);

export const VerificationTokenScalarFieldEnumSchema = z.enum([
  'identifier',
  'token',
  'expires',
]);

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'email',
  'emailVerified',
  'image',
  'interests',
  'specialization',
  'portfolio',
  'availability',
  'createdAt',
  'updatedAt',
  'stripeCustomerId',
  'stripeSubscriptionId',
  'stripePriceId',
  'stripeCurrentPeriodEnd',
]);

export const UserProfileScalarFieldEnumSchema = z.enum(['id', 'userId']);

export const PortfolioScalarFieldEnumSchema = z.enum(['id', 'userId', 'image']);

export const PhotoShootTypeScalarFieldEnumSchema = z.enum(['id', 'name']);

export const PhotographySkillScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'skillType',
]);

export const TodoScalarFieldEnumSchema = z.enum([
  'id',
  'text',
  'isCompleted',
  'createdAt',
  'updatedAt',
  'userId',
]);

export const PostScalarFieldEnumSchema = z.enum([
  'id',
  'title',
  'content',
  'published',
  'createdAt',
  'updatedAt',
  'authorId',
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const NullableJsonNullValueInputSchema = z
  .enum(['DbNull', 'JsonNull'])
  .transform((value) =>
    value === 'JsonNull'
      ? Prisma.JsonNull
      : value === 'DbNull'
      ? Prisma.DbNull
      : value
  );

export const NullsOrderSchema = z.enum(['first', 'last']);

export const JsonNullValueFilterSchema = z
  .enum(['DbNull', 'JsonNull', 'AnyNull'])
  .transform((value) =>
    value === 'JsonNull'
      ? Prisma.JsonNull
      : value === 'DbNull'
      ? Prisma.JsonNull
      : value === 'AnyNull'
      ? Prisma.AnyNull
      : value
  );

export const PhotoShootTypeNameSchema = z.enum([
  'PAID',
  'COLLAB',
  'CONVENTION',
]);

export type PhotoShootTypeNameType = `${z.infer<
  typeof PhotoShootTypeNameSchema
>}`;

export const PhotographySkillTypeSchema = z.enum([
  'CURRENT_FOCUS',
  'SPECIALTY',
]);

export type PhotographySkillTypeType = `${z.infer<
  typeof PhotographySkillTypeSchema
>}`;

export const PhotographySkillNameSchema = z.enum([
  'NSFW',
  'STUDIO',
  'OFF_SITE',
  'EDITORIAL',
  'COSPLAY',
  'FASHION',
  'PORTRAIT',
  'EVENTS',
]);

export type PhotographySkillNameType = `${z.infer<
  typeof PhotographySkillNameSchema
>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
});

export type Account = z.infer<typeof AccountSchema>;

/////////////////////////////////////////
// ACCOUNT PARTIAL SCHEMA
/////////////////////////////////////////

export const AccountPartialSchema = AccountSchema.partial();

export type AccountPartial = z.infer<typeof AccountPartialSchema>;

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
});

export type Session = z.infer<typeof SessionSchema>;

/////////////////////////////////////////
// SESSION PARTIAL SCHEMA
/////////////////////////////////////////

export const SessionPartialSchema = SessionSchema.partial();

export type SessionPartial = z.infer<typeof SessionPartialSchema>;

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
});

export type VerificationToken = z.infer<typeof VerificationTokenSchema>;

/////////////////////////////////////////
// VERIFICATION TOKEN PARTIAL SCHEMA
/////////////////////////////////////////

export const VerificationTokenPartialSchema = VerificationTokenSchema.partial();

export type VerificationTokenPartial = z.infer<
  typeof VerificationTokenPartialSchema
>;

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  interests: z.string().nullable(),
  specialization: z.string().nullable(),
  portfolio: JsonValueSchema,
  availability: JsonValueSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  stripeCustomerId: z.string().nullable(),
  stripeSubscriptionId: z.string().nullable(),
  stripePriceId: z.string().nullable(),
  stripeCurrentPeriodEnd: z.coerce.date().nullable(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial();

export type UserPartial = z.infer<typeof UserPartialSchema>;

/////////////////////////////////////////
// USER PROFILE SCHEMA
/////////////////////////////////////////

export const UserProfileSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

/////////////////////////////////////////
// USER PROFILE PARTIAL SCHEMA
/////////////////////////////////////////

export const UserProfilePartialSchema = UserProfileSchema.partial();

export type UserProfilePartial = z.infer<typeof UserProfilePartialSchema>;

/////////////////////////////////////////
// PORTFOLIO SCHEMA
/////////////////////////////////////////

export const PortfolioSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  image: z.string(),
});

export type Portfolio = z.infer<typeof PortfolioSchema>;

/////////////////////////////////////////
// PORTFOLIO PARTIAL SCHEMA
/////////////////////////////////////////

export const PortfolioPartialSchema = PortfolioSchema.partial();

export type PortfolioPartial = z.infer<typeof PortfolioPartialSchema>;

/////////////////////////////////////////
// PHOTO SHOOT TYPE SCHEMA
/////////////////////////////////////////

export const PhotoShootTypeSchema = z.object({
  name: PhotoShootTypeNameSchema,
  id: z.number().int(),
});

export type PhotoShootType = z.infer<typeof PhotoShootTypeSchema>;

/////////////////////////////////////////
// PHOTO SHOOT TYPE PARTIAL SCHEMA
/////////////////////////////////////////

export const PhotoShootTypePartialSchema = PhotoShootTypeSchema.partial();

export type PhotoShootTypePartial = z.infer<typeof PhotoShootTypePartialSchema>;

/////////////////////////////////////////
// PHOTOGRAPHY SKILL SCHEMA
/////////////////////////////////////////

export const PhotographySkillSchema = z.object({
  name: PhotographySkillNameSchema,
  skillType: PhotographySkillTypeSchema,
  id: z.number().int(),
});

export type PhotographySkill = z.infer<typeof PhotographySkillSchema>;

/////////////////////////////////////////
// PHOTOGRAPHY SKILL PARTIAL SCHEMA
/////////////////////////////////////////

export const PhotographySkillPartialSchema = PhotographySkillSchema.partial();

export type PhotographySkillPartial = z.infer<
  typeof PhotographySkillPartialSchema
>;

/////////////////////////////////////////
// TODO SCHEMA
/////////////////////////////////////////

export const TodoSchema = z.object({
  id: z.string().cuid(),
  text: z.string(),
  isCompleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
});

export type Todo = z.infer<typeof TodoSchema>;

/////////////////////////////////////////
// TODO PARTIAL SCHEMA
/////////////////////////////////////////

export const TodoPartialSchema = TodoSchema.partial();

export type TodoPartial = z.infer<typeof TodoPartialSchema>;

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  content: JsonValueSchema,
  published: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  authorId: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

/////////////////////////////////////////
// POST PARTIAL SCHEMA
/////////////////////////////////////////

export const PostPartialSchema = PostSchema.partial();

export type PostPartial = z.infer<typeof PostPartialSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z
  .object({
    select: z.lazy(() => AccountSelectSchema).optional(),
    include: z.lazy(() => AccountIncludeSchema).optional(),
  })
  .strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    type: z.boolean().optional(),
    provider: z.boolean().optional(),
    providerAccountId: z.boolean().optional(),
    refresh_token: z.boolean().optional(),
    access_token: z.boolean().optional(),
    expires_at: z.boolean().optional(),
    token_type: z.boolean().optional(),
    scope: z.boolean().optional(),
    id_token: z.boolean().optional(),
    session_state: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z
  .object({
    select: z.lazy(() => SessionSelectSchema).optional(),
    include: z.lazy(() => SessionIncludeSchema).optional(),
  })
  .strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z
  .object({
    id: z.boolean().optional(),
    sessionToken: z.boolean().optional(),
    userId: z.boolean().optional(),
    expires: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> =
  z
    .object({
      identifier: z.boolean().optional(),
      token: z.boolean().optional(),
      expires: z.boolean().optional(),
    })
    .strict();

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    UserProfile: z
      .union([z.boolean(), z.lazy(() => UserProfileArgsSchema)])
      .optional(),
    Account: z
      .union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)])
      .optional(),
    Session: z
      .union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)])
      .optional(),
    Todo: z
      .union([z.boolean(), z.lazy(() => TodoFindManyArgsSchema)])
      .optional(),
    Post: z
      .union([z.boolean(), z.lazy(() => PostFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
  .object({
    select: z.lazy(() => UserSelectSchema).optional(),
    include: z.lazy(() => UserIncludeSchema).optional(),
  })
  .strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  z
    .object({
      Account: z.boolean().optional(),
      Session: z.boolean().optional(),
      Todo: z.boolean().optional(),
      Post: z.boolean().optional(),
    })
    .strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    image: z.boolean().optional(),
    interests: z.boolean().optional(),
    specialization: z.boolean().optional(),
    portfolio: z.boolean().optional(),
    availability: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    stripeCustomerId: z.boolean().optional(),
    stripeSubscriptionId: z.boolean().optional(),
    stripePriceId: z.boolean().optional(),
    stripeCurrentPeriodEnd: z.boolean().optional(),
    UserProfile: z
      .union([z.boolean(), z.lazy(() => UserProfileArgsSchema)])
      .optional(),
    Account: z
      .union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)])
      .optional(),
    Session: z
      .union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)])
      .optional(),
    Todo: z
      .union([z.boolean(), z.lazy(() => TodoFindManyArgsSchema)])
      .optional(),
    Post: z
      .union([z.boolean(), z.lazy(() => PostFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// USER PROFILE
//------------------------------------------------------

export const UserProfileIncludeSchema: z.ZodType<Prisma.UserProfileInclude> = z
  .object({
    User: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    Portfolio: z
      .union([z.boolean(), z.lazy(() => PortfolioFindManyArgsSchema)])
      .optional(),
    photographySkills: z
      .union([z.boolean(), z.lazy(() => PhotographySkillFindManyArgsSchema)])
      .optional(),
    photoShootTypes: z
      .union([z.boolean(), z.lazy(() => PhotoShootTypeFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserProfileCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const UserProfileArgsSchema: z.ZodType<Prisma.UserProfileDefaultArgs> = z
  .object({
    select: z.lazy(() => UserProfileSelectSchema).optional(),
    include: z.lazy(() => UserProfileIncludeSchema).optional(),
  })
  .strict();

export const UserProfileCountOutputTypeArgsSchema: z.ZodType<Prisma.UserProfileCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => UserProfileCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const UserProfileCountOutputTypeSelectSchema: z.ZodType<Prisma.UserProfileCountOutputTypeSelect> =
  z
    .object({
      Portfolio: z.boolean().optional(),
      photographySkills: z.boolean().optional(),
      photoShootTypes: z.boolean().optional(),
    })
    .strict();

export const UserProfileSelectSchema: z.ZodType<Prisma.UserProfileSelect> = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    User: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    Portfolio: z
      .union([z.boolean(), z.lazy(() => PortfolioFindManyArgsSchema)])
      .optional(),
    photographySkills: z
      .union([z.boolean(), z.lazy(() => PhotographySkillFindManyArgsSchema)])
      .optional(),
    photoShootTypes: z
      .union([z.boolean(), z.lazy(() => PhotoShootTypeFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserProfileCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// PORTFOLIO
//------------------------------------------------------

export const PortfolioIncludeSchema: z.ZodType<Prisma.PortfolioInclude> = z
  .object({
    UserProfile: z
      .union([z.boolean(), z.lazy(() => UserProfileArgsSchema)])
      .optional(),
  })
  .strict();

export const PortfolioArgsSchema: z.ZodType<Prisma.PortfolioDefaultArgs> = z
  .object({
    select: z.lazy(() => PortfolioSelectSchema).optional(),
    include: z.lazy(() => PortfolioIncludeSchema).optional(),
  })
  .strict();

export const PortfolioSelectSchema: z.ZodType<Prisma.PortfolioSelect> = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    image: z.boolean().optional(),
    UserProfile: z
      .union([z.boolean(), z.lazy(() => UserProfileArgsSchema)])
      .optional(),
  })
  .strict();

// PHOTO SHOOT TYPE
//------------------------------------------------------

export const PhotoShootTypeIncludeSchema: z.ZodType<Prisma.PhotoShootTypeInclude> =
  z
    .object({
      UserProfile: z
        .union([z.boolean(), z.lazy(() => UserProfileFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => PhotoShootTypeCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const PhotoShootTypeArgsSchema: z.ZodType<Prisma.PhotoShootTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => PhotoShootTypeSelectSchema).optional(),
      include: z.lazy(() => PhotoShootTypeIncludeSchema).optional(),
    })
    .strict();

export const PhotoShootTypeCountOutputTypeArgsSchema: z.ZodType<Prisma.PhotoShootTypeCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => PhotoShootTypeCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const PhotoShootTypeCountOutputTypeSelectSchema: z.ZodType<Prisma.PhotoShootTypeCountOutputTypeSelect> =
  z
    .object({
      UserProfile: z.boolean().optional(),
    })
    .strict();

export const PhotoShootTypeSelectSchema: z.ZodType<Prisma.PhotoShootTypeSelect> =
  z
    .object({
      id: z.boolean().optional(),
      name: z.boolean().optional(),
      UserProfile: z
        .union([z.boolean(), z.lazy(() => UserProfileFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => PhotoShootTypeCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// PHOTOGRAPHY SKILL
//------------------------------------------------------

export const PhotographySkillIncludeSchema: z.ZodType<Prisma.PhotographySkillInclude> =
  z
    .object({
      UserProfile: z
        .union([z.boolean(), z.lazy(() => UserProfileFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => PhotographySkillCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const PhotographySkillArgsSchema: z.ZodType<Prisma.PhotographySkillDefaultArgs> =
  z
    .object({
      select: z.lazy(() => PhotographySkillSelectSchema).optional(),
      include: z.lazy(() => PhotographySkillIncludeSchema).optional(),
    })
    .strict();

export const PhotographySkillCountOutputTypeArgsSchema: z.ZodType<Prisma.PhotographySkillCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => PhotographySkillCountOutputTypeSelectSchema)
        .nullish(),
    })
    .strict();

export const PhotographySkillCountOutputTypeSelectSchema: z.ZodType<Prisma.PhotographySkillCountOutputTypeSelect> =
  z
    .object({
      UserProfile: z.boolean().optional(),
    })
    .strict();

export const PhotographySkillSelectSchema: z.ZodType<Prisma.PhotographySkillSelect> =
  z
    .object({
      id: z.boolean().optional(),
      name: z.boolean().optional(),
      skillType: z.boolean().optional(),
      UserProfile: z
        .union([z.boolean(), z.lazy(() => UserProfileFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => PhotographySkillCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// TODO
//------------------------------------------------------

export const TodoIncludeSchema: z.ZodType<Prisma.TodoInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const TodoArgsSchema: z.ZodType<Prisma.TodoDefaultArgs> = z
  .object({
    select: z.lazy(() => TodoSelectSchema).optional(),
    include: z.lazy(() => TodoIncludeSchema).optional(),
  })
  .strict();

export const TodoSelectSchema: z.ZodType<Prisma.TodoSelect> = z
  .object({
    id: z.boolean().optional(),
    text: z.boolean().optional(),
    isCompleted: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

// POST
//------------------------------------------------------

export const PostIncludeSchema: z.ZodType<Prisma.PostInclude> = z
  .object({
    author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const PostArgsSchema: z.ZodType<Prisma.PostDefaultArgs> = z
  .object({
    select: z.lazy(() => PostSelectSchema).optional(),
    include: z.lazy(() => PostIncludeSchema).optional(),
  })
  .strict();

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z
  .object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    content: z.boolean().optional(),
    published: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    authorId: z.boolean().optional(),
    author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => AccountWhereInputSchema),
        z.lazy(() => AccountWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AccountWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AccountWhereInputSchema),
        z.lazy(() => AccountWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    provider: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    providerAccountId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    refresh_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    access_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    expires_at: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    token_type: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    scope: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    id_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    session_state: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      access_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      expires_at: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      token_type: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      scope: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      session_state: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        provider_providerAccountId: z.lazy(
          () => AccountProviderProviderAccountIdCompoundUniqueInputSchema
        ),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        provider_providerAccountId: z.lazy(
          () => AccountProviderProviderAccountIdCompoundUniqueInputSchema
        ),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          provider_providerAccountId: z
            .lazy(
              () => AccountProviderProviderAccountIdCompoundUniqueInputSchema
            )
            .optional(),
          AND: z
            .union([
              z.lazy(() => AccountWhereInputSchema),
              z.lazy(() => AccountWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => AccountWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => AccountWhereInputSchema),
              z.lazy(() => AccountWhereInputSchema).array(),
            ])
            .optional(),
          userId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          type: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          provider: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          providerAccountId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          refresh_token: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          access_token: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          expires_at: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          token_type: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          scope: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          id_token: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          session_state: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      access_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      expires_at: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      token_type: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      scope: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      session_state: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
          z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AccountScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
          z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      type: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      provider: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      providerAccountId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      refresh_token: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SessionWhereInputSchema),
        z.lazy(() => SessionWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SessionWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SessionWhereInputSchema),
        z.lazy(() => SessionWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    sessionToken: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    expires: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        sessionToken: z.string(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        sessionToken: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          sessionToken: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => SessionWhereInputSchema),
              z.lazy(() => SessionWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => SessionWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => SessionWhereInputSchema),
              z.lazy(() => SessionWhereInputSchema).array(),
            ])
            .optional(),
          userId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          expires: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SessionScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      sessionToken: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      expires: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => VerificationTokenWhereInputSchema),
          z.lazy(() => VerificationTokenWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => VerificationTokenWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => VerificationTokenWhereInputSchema),
          z.lazy(() => VerificationTokenWhereInputSchema).array(),
        ])
        .optional(),
      identifier: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      expires: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> =
  z
    .object({
      identifier: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> =
  z
    .union([
      z.object({
        token: z.string(),
        identifier_token: z.lazy(
          () => VerificationTokenIdentifierTokenCompoundUniqueInputSchema
        ),
      }),
      z.object({
        token: z.string(),
      }),
      z.object({
        identifier_token: z.lazy(
          () => VerificationTokenIdentifierTokenCompoundUniqueInputSchema
        ),
      }),
    ])
    .and(
      z
        .object({
          token: z.string().optional(),
          identifier_token: z
            .lazy(
              () => VerificationTokenIdentifierTokenCompoundUniqueInputSchema
            )
            .optional(),
          AND: z
            .union([
              z.lazy(() => VerificationTokenWhereInputSchema),
              z.lazy(() => VerificationTokenWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => VerificationTokenWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => VerificationTokenWhereInputSchema),
              z.lazy(() => VerificationTokenWhereInputSchema).array(),
            ])
            .optional(),
          identifier: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          expires: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        })
        .strict()
    );

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> =
  z
    .object({
      identifier: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => VerificationTokenCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => VerificationTokenMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => VerificationTokenMinOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      identifier: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      token: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      expires: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    emailVerified: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    interests: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    specialization: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    portfolio: z.lazy(() => JsonNullableFilterSchema).optional(),
    availability: z.lazy(() => JsonNullableFilterSchema).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    stripeCustomerId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    stripeSubscriptionId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    stripePriceId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    stripeCurrentPeriodEnd: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    UserProfile: z
      .union([
        z.lazy(() => UserProfileNullableRelationFilterSchema),
        z.lazy(() => UserProfileWhereInputSchema),
      ])
      .optional()
      .nullable(),
    Account: z.lazy(() => AccountListRelationFilterSchema).optional(),
    Session: z.lazy(() => SessionListRelationFilterSchema).optional(),
    Todo: z.lazy(() => TodoListRelationFilterSchema).optional(),
    Post: z.lazy(() => PostListRelationFilterSchema).optional(),
  })
  .strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      interests: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      specialization: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      portfolio: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      stripeCustomerId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      stripeSubscriptionId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      stripePriceId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      stripeCurrentPeriodEnd: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      UserProfile: z
        .lazy(() => UserProfileOrderByWithRelationInputSchema)
        .optional(),
      Account: z
        .lazy(() => AccountOrderByRelationAggregateInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionOrderByRelationAggregateInputSchema)
        .optional(),
      Todo: z.lazy(() => TodoOrderByRelationAggregateInputSchema).optional(),
      Post: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
    })
    .strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        email: z.string(),
        stripeCustomerId: z.string(),
        stripeSubscriptionId: z.string(),
      }),
      z.object({
        id: z.string().cuid(),
        email: z.string(),
        stripeCustomerId: z.string(),
      }),
      z.object({
        id: z.string().cuid(),
        email: z.string(),
        stripeSubscriptionId: z.string(),
      }),
      z.object({
        id: z.string().cuid(),
        email: z.string(),
      }),
      z.object({
        id: z.string().cuid(),
        stripeCustomerId: z.string(),
        stripeSubscriptionId: z.string(),
      }),
      z.object({
        id: z.string().cuid(),
        stripeCustomerId: z.string(),
      }),
      z.object({
        id: z.string().cuid(),
        stripeSubscriptionId: z.string(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        email: z.string(),
        stripeCustomerId: z.string(),
        stripeSubscriptionId: z.string(),
      }),
      z.object({
        email: z.string(),
        stripeCustomerId: z.string(),
      }),
      z.object({
        email: z.string(),
        stripeSubscriptionId: z.string(),
      }),
      z.object({
        email: z.string(),
      }),
      z.object({
        stripeCustomerId: z.string(),
        stripeSubscriptionId: z.string(),
      }),
      z.object({
        stripeCustomerId: z.string(),
      }),
      z.object({
        stripeSubscriptionId: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          email: z.string().optional(),
          stripeCustomerId: z.string().optional(),
          stripeSubscriptionId: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UserWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          emailVerified: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          image: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          interests: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          specialization: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          portfolio: z.lazy(() => JsonNullableFilterSchema).optional(),
          availability: z.lazy(() => JsonNullableFilterSchema).optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          stripePriceId: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          stripeCurrentPeriodEnd: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          UserProfile: z
            .union([
              z.lazy(() => UserProfileNullableRelationFilterSchema),
              z.lazy(() => UserProfileWhereInputSchema),
            ])
            .optional()
            .nullable(),
          Account: z.lazy(() => AccountListRelationFilterSchema).optional(),
          Session: z.lazy(() => SessionListRelationFilterSchema).optional(),
          Todo: z.lazy(() => TodoListRelationFilterSchema).optional(),
          Post: z.lazy(() => PostListRelationFilterSchema).optional(),
        })
        .strict()
    );

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      interests: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      specialization: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      portfolio: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      stripeCustomerId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      stripeSubscriptionId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      stripePriceId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      stripeCurrentPeriodEnd: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      email: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      emailVerified: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      interests: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      specialization: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      portfolio: z
        .lazy(() => JsonNullableWithAggregatesFilterSchema)
        .optional(),
      availability: z
        .lazy(() => JsonNullableWithAggregatesFilterSchema)
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      stripeSubscriptionId: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const UserProfileWhereInputSchema: z.ZodType<Prisma.UserProfileWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserProfileWhereInputSchema),
          z.lazy(() => UserProfileWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserProfileWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserProfileWhereInputSchema),
          z.lazy(() => UserProfileWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      User: z
        .union([
          z.lazy(() => UserRelationFilterSchema),
          z.lazy(() => UserWhereInputSchema),
        ])
        .optional(),
      Portfolio: z.lazy(() => PortfolioListRelationFilterSchema).optional(),
      photographySkills: z
        .lazy(() => PhotographySkillListRelationFilterSchema)
        .optional(),
      photoShootTypes: z
        .lazy(() => PhotoShootTypeListRelationFilterSchema)
        .optional(),
    })
    .strict();

export const UserProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.UserProfileOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      User: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
      Portfolio: z
        .lazy(() => PortfolioOrderByRelationAggregateInputSchema)
        .optional(),
      photographySkills: z
        .lazy(() => PhotographySkillOrderByRelationAggregateInputSchema)
        .optional(),
      photoShootTypes: z
        .lazy(() => PhotoShootTypeOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const UserProfileWhereUniqueInputSchema: z.ZodType<Prisma.UserProfileWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        userId: z.string(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        userId: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          userId: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => UserProfileWhereInputSchema),
              z.lazy(() => UserProfileWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UserProfileWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UserProfileWhereInputSchema),
              z.lazy(() => UserProfileWhereInputSchema).array(),
            ])
            .optional(),
          User: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
          Portfolio: z.lazy(() => PortfolioListRelationFilterSchema).optional(),
          photographySkills: z
            .lazy(() => PhotographySkillListRelationFilterSchema)
            .optional(),
          photoShootTypes: z
            .lazy(() => PhotoShootTypeListRelationFilterSchema)
            .optional(),
        })
        .strict()
    );

export const UserProfileOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserProfileOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => UserProfileCountOrderByAggregateInputSchema)
        .optional(),
      _max: z.lazy(() => UserProfileMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UserProfileMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const UserProfileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserProfileScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserProfileScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserProfileScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserProfileScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserProfileScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserProfileScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const PortfolioWhereInputSchema: z.ZodType<Prisma.PortfolioWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PortfolioWhereInputSchema),
          z.lazy(() => PortfolioWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PortfolioWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PortfolioWhereInputSchema),
          z.lazy(() => PortfolioWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      image: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      UserProfile: z
        .union([
          z.lazy(() => UserProfileRelationFilterSchema),
          z.lazy(() => UserProfileWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PortfolioOrderByWithRelationInputSchema: z.ZodType<Prisma.PortfolioOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      UserProfile: z
        .lazy(() => UserProfileOrderByWithRelationInputSchema)
        .optional(),
    })
    .strict();

export const PortfolioWhereUniqueInputSchema: z.ZodType<Prisma.PortfolioWhereUniqueInput> =
  z
    .object({
      id: z.string().cuid(),
    })
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          AND: z
            .union([
              z.lazy(() => PortfolioWhereInputSchema),
              z.lazy(() => PortfolioWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => PortfolioWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => PortfolioWhereInputSchema),
              z.lazy(() => PortfolioWhereInputSchema).array(),
            ])
            .optional(),
          userId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          image: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          UserProfile: z
            .union([
              z.lazy(() => UserProfileRelationFilterSchema),
              z.lazy(() => UserProfileWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const PortfolioOrderByWithAggregationInputSchema: z.ZodType<Prisma.PortfolioOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => PortfolioCountOrderByAggregateInputSchema)
        .optional(),
      _max: z.lazy(() => PortfolioMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => PortfolioMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const PortfolioScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PortfolioScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PortfolioScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PortfolioScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PortfolioScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PortfolioScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PortfolioScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      image: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const PhotoShootTypeWhereInputSchema: z.ZodType<Prisma.PhotoShootTypeWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PhotoShootTypeWhereInputSchema),
          z.lazy(() => PhotoShootTypeWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PhotoShootTypeWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PhotoShootTypeWhereInputSchema),
          z.lazy(() => PhotoShootTypeWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z
        .union([
          z.lazy(() => EnumPhotoShootTypeNameFilterSchema),
          z.lazy(() => PhotoShootTypeNameSchema),
        ])
        .optional(),
      UserProfile: z.lazy(() => UserProfileListRelationFilterSchema).optional(),
    })
    .strict();

export const PhotoShootTypeOrderByWithRelationInputSchema: z.ZodType<Prisma.PhotoShootTypeOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      UserProfile: z
        .lazy(() => UserProfileOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const PhotoShootTypeWhereUniqueInputSchema: z.ZodType<Prisma.PhotoShootTypeWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        name: z.lazy(() => PhotoShootTypeNameSchema),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        name: z.lazy(() => PhotoShootTypeNameSchema),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          name: z.lazy(() => PhotoShootTypeNameSchema).optional(),
          AND: z
            .union([
              z.lazy(() => PhotoShootTypeWhereInputSchema),
              z.lazy(() => PhotoShootTypeWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => PhotoShootTypeWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => PhotoShootTypeWhereInputSchema),
              z.lazy(() => PhotoShootTypeWhereInputSchema).array(),
            ])
            .optional(),
          UserProfile: z
            .lazy(() => UserProfileListRelationFilterSchema)
            .optional(),
        })
        .strict()
    );

export const PhotoShootTypeOrderByWithAggregationInputSchema: z.ZodType<Prisma.PhotoShootTypeOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => PhotoShootTypeCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => PhotoShootTypeAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => PhotoShootTypeMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => PhotoShootTypeMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => PhotoShootTypeSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const PhotoShootTypeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PhotoShootTypeScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PhotoShootTypeScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => PhotoShootTypeScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PhotoShootTypeScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PhotoShootTypeScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => PhotoShootTypeScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([
          z.lazy(() => EnumPhotoShootTypeNameWithAggregatesFilterSchema),
          z.lazy(() => PhotoShootTypeNameSchema),
        ])
        .optional(),
    })
    .strict();

export const PhotographySkillWhereInputSchema: z.ZodType<Prisma.PhotographySkillWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PhotographySkillWhereInputSchema),
          z.lazy(() => PhotographySkillWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PhotographySkillWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PhotographySkillWhereInputSchema),
          z.lazy(() => PhotographySkillWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z
        .union([
          z.lazy(() => EnumPhotographySkillNameFilterSchema),
          z.lazy(() => PhotographySkillNameSchema),
        ])
        .optional(),
      skillType: z
        .union([
          z.lazy(() => EnumPhotographySkillTypeFilterSchema),
          z.lazy(() => PhotographySkillTypeSchema),
        ])
        .optional(),
      UserProfile: z.lazy(() => UserProfileListRelationFilterSchema).optional(),
    })
    .strict();

export const PhotographySkillOrderByWithRelationInputSchema: z.ZodType<Prisma.PhotographySkillOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      skillType: z.lazy(() => SortOrderSchema).optional(),
      UserProfile: z
        .lazy(() => UserProfileOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const PhotographySkillWhereUniqueInputSchema: z.ZodType<Prisma.PhotographySkillWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => PhotographySkillWhereInputSchema),
              z.lazy(() => PhotographySkillWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => PhotographySkillWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => PhotographySkillWhereInputSchema),
              z.lazy(() => PhotographySkillWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([
              z.lazy(() => EnumPhotographySkillNameFilterSchema),
              z.lazy(() => PhotographySkillNameSchema),
            ])
            .optional(),
          skillType: z
            .union([
              z.lazy(() => EnumPhotographySkillTypeFilterSchema),
              z.lazy(() => PhotographySkillTypeSchema),
            ])
            .optional(),
          UserProfile: z
            .lazy(() => UserProfileListRelationFilterSchema)
            .optional(),
        })
        .strict()
    );

export const PhotographySkillOrderByWithAggregationInputSchema: z.ZodType<Prisma.PhotographySkillOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      skillType: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => PhotographySkillCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => PhotographySkillAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => PhotographySkillMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => PhotographySkillMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => PhotographySkillSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const PhotographySkillScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PhotographySkillScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PhotographySkillScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => PhotographySkillScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PhotographySkillScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PhotographySkillScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => PhotographySkillScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([
          z.lazy(() => EnumPhotographySkillNameWithAggregatesFilterSchema),
          z.lazy(() => PhotographySkillNameSchema),
        ])
        .optional(),
      skillType: z
        .union([
          z.lazy(() => EnumPhotographySkillTypeWithAggregatesFilterSchema),
          z.lazy(() => PhotographySkillTypeSchema),
        ])
        .optional(),
    })
    .strict();

export const TodoWhereInputSchema: z.ZodType<Prisma.TodoWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TodoWhereInputSchema),
        z.lazy(() => TodoWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TodoWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TodoWhereInputSchema),
        z.lazy(() => TodoWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    isCompleted: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const TodoOrderByWithRelationInputSchema: z.ZodType<Prisma.TodoOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      isCompleted: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const TodoWhereUniqueInputSchema: z.ZodType<Prisma.TodoWhereUniqueInput> =
  z
    .object({
      id: z.string().cuid(),
    })
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          AND: z
            .union([
              z.lazy(() => TodoWhereInputSchema),
              z.lazy(() => TodoWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => TodoWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => TodoWhereInputSchema),
              z.lazy(() => TodoWhereInputSchema).array(),
            ])
            .optional(),
          text: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          isCompleted: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          userId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const TodoOrderByWithAggregationInputSchema: z.ZodType<Prisma.TodoOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      isCompleted: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => TodoCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => TodoMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => TodoMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const TodoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TodoScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TodoScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TodoScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TodoScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TodoScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TodoScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      text: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      isCompleted: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const PostWhereInputSchema: z.ZodType<Prisma.PostWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PostWhereInputSchema),
        z.lazy(() => PostWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PostWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PostWhereInputSchema),
        z.lazy(() => PostWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    content: z.lazy(() => JsonNullableFilterSchema).optional(),
    published: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    authorId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    author: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const PostOrderByWithRelationInputSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      content: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      published: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      authorId: z.lazy(() => SortOrderSchema).optional(),
      author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> =
  z
    .object({
      id: z.string().cuid(),
    })
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          AND: z
            .union([
              z.lazy(() => PostWhereInputSchema),
              z.lazy(() => PostWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => PostWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => PostWhereInputSchema),
              z.lazy(() => PostWhereInputSchema).array(),
            ])
            .optional(),
          title: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          content: z.lazy(() => JsonNullableFilterSchema).optional(),
          published: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          authorId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          author: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      content: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      published: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      authorId: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PostScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PostScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PostScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      title: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      content: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
      published: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      authorId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    type: z.string(),
    provider: z.string(),
    providerAccountId: z.string(),
    refresh_token: z.string().optional().nullable(),
    access_token: z.string().optional().nullable(),
    expires_at: z.number().int().optional().nullable(),
    token_type: z.string().optional().nullable(),
    scope: z.string().optional().nullable(),
    id_token: z.string().optional().nullable(),
    session_state: z.string().optional().nullable(),
    user: z.lazy(() => UserCreateNestedOneWithoutAccountInputSchema),
  })
  .strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().optional().nullable(),
      access_token: z.string().optional().nullable(),
      expires_at: z.number().int().optional().nullable(),
      token_type: z.string().optional().nullable(),
      scope: z.string().optional().nullable(),
      id_token: z.string().optional().nullable(),
      session_state: z.string().optional().nullable(),
    })
    .strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().cuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    type: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    provider: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    refresh_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    access_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    expires_at: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    token_type: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    session_state: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutAccountNestedInputSchema)
      .optional(),
  })
  .strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().optional().nullable(),
      access_token: z.string().optional().nullable(),
      expires_at: z.number().int().optional().nullable(),
      token_type: z.string().optional().nullable(),
      scope: z.string().optional().nullable(),
      id_token: z.string().optional().nullable(),
      session_state: z.string().optional().nullable(),
    })
    .strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    sessionToken: z.string(),
    expires: z.coerce.date(),
    user: z.lazy(() => UserCreateNestedOneWithoutSessionInputSchema),
  })
  .strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      sessionToken: z.string(),
      userId: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().cuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sessionToken: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expires: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutSessionNestedInputSchema)
      .optional(),
  })
  .strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      sessionToken: z.string(),
      userId: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> =
  z
    .object({
      identifier: z.string(),
      token: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> =
  z
    .object({
      identifier: z.string(),
      token: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> =
  z
    .object({
      identifier: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> =
  z
    .object({
      identifier: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> =
  z
    .object({
      identifier: z.string(),
      token: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> =
  z
    .object({
      identifier: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> =
  z
    .object({
      identifier: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    name: z.string().optional().nullable(),
    email: z.string(),
    emailVerified: z.coerce.date().optional().nullable(),
    image: z.string().optional().nullable(),
    interests: z.string().optional().nullable(),
    specialization: z.string().optional().nullable(),
    portfolio: z
      .union([
        z.lazy(() => NullableJsonNullValueInputSchema),
        InputJsonValueSchema,
      ])
      .optional(),
    availability: z
      .union([
        z.lazy(() => NullableJsonNullValueInputSchema),
        InputJsonValueSchema,
      ])
      .optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    stripeCustomerId: z.string().optional().nullable(),
    stripeSubscriptionId: z.string().optional().nullable(),
    stripePriceId: z.string().optional().nullable(),
    stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
    UserProfile: z
      .lazy(() => UserProfileCreateNestedOneWithoutUserInputSchema)
      .optional(),
    Account: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
      .optional(),
    Session: z
      .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
      .optional(),
    Todo: z.lazy(() => TodoCreateNestedManyWithoutUserInputSchema).optional(),
    Post: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  })
  .strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().optional().nullable(),
      email: z.string(),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      interests: z.string().optional().nullable(),
      specialization: z.string().optional().nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      stripeCustomerId: z.string().optional().nullable(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
      UserProfile: z
        .lazy(() => UserProfileUncheckedCreateNestedOneWithoutUserInputSchema)
        .optional(),
      Account: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Todo: z
        .lazy(() => TodoUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Post: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema)
        .optional(),
    })
    .strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().cuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    interests: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    specialization: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    portfolio: z
      .union([
        z.lazy(() => NullableJsonNullValueInputSchema),
        InputJsonValueSchema,
      ])
      .optional(),
    availability: z
      .union([
        z.lazy(() => NullableJsonNullValueInputSchema),
        InputJsonValueSchema,
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    stripeCustomerId: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    stripeSubscriptionId: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    stripePriceId: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    stripeCurrentPeriodEnd: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    UserProfile: z
      .lazy(() => UserProfileUpdateOneWithoutUserNestedInputSchema)
      .optional(),
    Account: z
      .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    Session: z
      .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    Todo: z.lazy(() => TodoUpdateManyWithoutUserNestedInputSchema).optional(),
    Post: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  })
  .strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      interests: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      specialization: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      UserProfile: z
        .lazy(() => UserProfileUncheckedUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      Account: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Todo: z
        .lazy(() => TodoUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Post: z
        .lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().optional().nullable(),
      email: z.string(),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      interests: z.string().optional().nullable(),
      specialization: z.string().optional().nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      stripeCustomerId: z.string().optional().nullable(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
    })
    .strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      interests: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      specialization: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      interests: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      specialization: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const UserProfileCreateInputSchema: z.ZodType<Prisma.UserProfileCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      User: z.lazy(() => UserCreateNestedOneWithoutUserProfileInputSchema),
      Portfolio: z
        .lazy(() => PortfolioCreateNestedManyWithoutUserProfileInputSchema)
        .optional(),
      photographySkills: z
        .lazy(
          () => PhotographySkillCreateNestedManyWithoutUserProfileInputSchema
        )
        .optional(),
      photoShootTypes: z
        .lazy(() => PhotoShootTypeCreateNestedManyWithoutUserProfileInputSchema)
        .optional(),
    })
    .strict();

export const UserProfileUncheckedCreateInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      Portfolio: z
        .lazy(
          () => PortfolioUncheckedCreateNestedManyWithoutUserProfileInputSchema
        )
        .optional(),
      photographySkills: z
        .lazy(
          () =>
            PhotographySkillUncheckedCreateNestedManyWithoutUserProfileInputSchema
        )
        .optional(),
      photoShootTypes: z
        .lazy(
          () =>
            PhotoShootTypeUncheckedCreateNestedManyWithoutUserProfileInputSchema
        )
        .optional(),
    })
    .strict();

export const UserProfileUpdateInputSchema: z.ZodType<Prisma.UserProfileUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      User: z
        .lazy(() => UserUpdateOneRequiredWithoutUserProfileNestedInputSchema)
        .optional(),
      Portfolio: z
        .lazy(() => PortfolioUpdateManyWithoutUserProfileNestedInputSchema)
        .optional(),
      photographySkills: z
        .lazy(
          () => PhotographySkillUpdateManyWithoutUserProfileNestedInputSchema
        )
        .optional(),
      photoShootTypes: z
        .lazy(() => PhotoShootTypeUpdateManyWithoutUserProfileNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserProfileUncheckedUpdateInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Portfolio: z
        .lazy(
          () => PortfolioUncheckedUpdateManyWithoutUserProfileNestedInputSchema
        )
        .optional(),
      photographySkills: z
        .lazy(
          () =>
            PhotographySkillUncheckedUpdateManyWithoutUserProfileNestedInputSchema
        )
        .optional(),
      photoShootTypes: z
        .lazy(
          () =>
            PhotoShootTypeUncheckedUpdateManyWithoutUserProfileNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const UserProfileCreateManyInputSchema: z.ZodType<Prisma.UserProfileCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
    })
    .strict();

export const UserProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.UserProfileUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PortfolioCreateInputSchema: z.ZodType<Prisma.PortfolioCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      image: z.string(),
      UserProfile: z.lazy(
        () => UserProfileCreateNestedOneWithoutPortfolioInputSchema
      ),
    })
    .strict();

export const PortfolioUncheckedCreateInputSchema: z.ZodType<Prisma.PortfolioUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      image: z.string(),
    })
    .strict();

export const PortfolioUpdateInputSchema: z.ZodType<Prisma.PortfolioUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      UserProfile: z
        .lazy(
          () => UserProfileUpdateOneRequiredWithoutPortfolioNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const PortfolioUncheckedUpdateInputSchema: z.ZodType<Prisma.PortfolioUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PortfolioCreateManyInputSchema: z.ZodType<Prisma.PortfolioCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      image: z.string(),
    })
    .strict();

export const PortfolioUpdateManyMutationInputSchema: z.ZodType<Prisma.PortfolioUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PortfolioUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PortfolioUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PhotoShootTypeCreateInputSchema: z.ZodType<Prisma.PhotoShootTypeCreateInput> =
  z
    .object({
      name: z.lazy(() => PhotoShootTypeNameSchema),
      UserProfile: z
        .lazy(
          () => UserProfileCreateNestedManyWithoutPhotoShootTypesInputSchema
        )
        .optional(),
    })
    .strict();

export const PhotoShootTypeUncheckedCreateInputSchema: z.ZodType<Prisma.PhotoShootTypeUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.lazy(() => PhotoShootTypeNameSchema),
      UserProfile: z
        .lazy(
          () =>
            UserProfileUncheckedCreateNestedManyWithoutPhotoShootTypesInputSchema
        )
        .optional(),
    })
    .strict();

export const PhotoShootTypeUpdateInputSchema: z.ZodType<Prisma.PhotoShootTypeUpdateInput> =
  z
    .object({
      name: z
        .union([
          z.lazy(() => PhotoShootTypeNameSchema),
          z.lazy(() => EnumPhotoShootTypeNameFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      UserProfile: z
        .lazy(
          () => UserProfileUpdateManyWithoutPhotoShootTypesNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const PhotoShootTypeUncheckedUpdateInputSchema: z.ZodType<Prisma.PhotoShootTypeUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => PhotoShootTypeNameSchema),
          z.lazy(() => EnumPhotoShootTypeNameFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      UserProfile: z
        .lazy(
          () =>
            UserProfileUncheckedUpdateManyWithoutPhotoShootTypesNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const PhotoShootTypeCreateManyInputSchema: z.ZodType<Prisma.PhotoShootTypeCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.lazy(() => PhotoShootTypeNameSchema),
    })
    .strict();

export const PhotoShootTypeUpdateManyMutationInputSchema: z.ZodType<Prisma.PhotoShootTypeUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.lazy(() => PhotoShootTypeNameSchema),
          z.lazy(() => EnumPhotoShootTypeNameFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PhotoShootTypeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PhotoShootTypeUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => PhotoShootTypeNameSchema),
          z.lazy(() => EnumPhotoShootTypeNameFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PhotographySkillCreateInputSchema: z.ZodType<Prisma.PhotographySkillCreateInput> =
  z
    .object({
      id: z.number().int(),
      name: z.lazy(() => PhotographySkillNameSchema),
      skillType: z.lazy(() => PhotographySkillTypeSchema),
      UserProfile: z
        .lazy(
          () => UserProfileCreateNestedManyWithoutPhotographySkillsInputSchema
        )
        .optional(),
    })
    .strict();

export const PhotographySkillUncheckedCreateInputSchema: z.ZodType<Prisma.PhotographySkillUncheckedCreateInput> =
  z
    .object({
      id: z.number().int(),
      name: z.lazy(() => PhotographySkillNameSchema),
      skillType: z.lazy(() => PhotographySkillTypeSchema),
      UserProfile: z
        .lazy(
          () =>
            UserProfileUncheckedCreateNestedManyWithoutPhotographySkillsInputSchema
        )
        .optional(),
    })
    .strict();

export const PhotographySkillUpdateInputSchema: z.ZodType<Prisma.PhotographySkillUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => PhotographySkillNameSchema),
          z.lazy(
            () => EnumPhotographySkillNameFieldUpdateOperationsInputSchema
          ),
        ])
        .optional(),
      skillType: z
        .union([
          z.lazy(() => PhotographySkillTypeSchema),
          z.lazy(
            () => EnumPhotographySkillTypeFieldUpdateOperationsInputSchema
          ),
        ])
        .optional(),
      UserProfile: z
        .lazy(
          () => UserProfileUpdateManyWithoutPhotographySkillsNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const PhotographySkillUncheckedUpdateInputSchema: z.ZodType<Prisma.PhotographySkillUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => PhotographySkillNameSchema),
          z.lazy(
            () => EnumPhotographySkillNameFieldUpdateOperationsInputSchema
          ),
        ])
        .optional(),
      skillType: z
        .union([
          z.lazy(() => PhotographySkillTypeSchema),
          z.lazy(
            () => EnumPhotographySkillTypeFieldUpdateOperationsInputSchema
          ),
        ])
        .optional(),
      UserProfile: z
        .lazy(
          () =>
            UserProfileUncheckedUpdateManyWithoutPhotographySkillsNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const PhotographySkillCreateManyInputSchema: z.ZodType<Prisma.PhotographySkillCreateManyInput> =
  z
    .object({
      id: z.number().int(),
      name: z.lazy(() => PhotographySkillNameSchema),
      skillType: z.lazy(() => PhotographySkillTypeSchema),
    })
    .strict();

export const PhotographySkillUpdateManyMutationInputSchema: z.ZodType<Prisma.PhotographySkillUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => PhotographySkillNameSchema),
          z.lazy(
            () => EnumPhotographySkillNameFieldUpdateOperationsInputSchema
          ),
        ])
        .optional(),
      skillType: z
        .union([
          z.lazy(() => PhotographySkillTypeSchema),
          z.lazy(
            () => EnumPhotographySkillTypeFieldUpdateOperationsInputSchema
          ),
        ])
        .optional(),
    })
    .strict();

export const PhotographySkillUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PhotographySkillUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => PhotographySkillNameSchema),
          z.lazy(
            () => EnumPhotographySkillNameFieldUpdateOperationsInputSchema
          ),
        ])
        .optional(),
      skillType: z
        .union([
          z.lazy(() => PhotographySkillTypeSchema),
          z.lazy(
            () => EnumPhotographySkillTypeFieldUpdateOperationsInputSchema
          ),
        ])
        .optional(),
    })
    .strict();

export const TodoCreateInputSchema: z.ZodType<Prisma.TodoCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    text: z.string(),
    isCompleted: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutTodoInputSchema),
  })
  .strict();

export const TodoUncheckedCreateInputSchema: z.ZodType<Prisma.TodoUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      text: z.string(),
      isCompleted: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.string(),
    })
    .strict();

export const TodoUpdateInputSchema: z.ZodType<Prisma.TodoUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().cuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    text: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    isCompleted: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutTodoNestedInputSchema)
      .optional(),
  })
  .strict();

export const TodoUncheckedUpdateInputSchema: z.ZodType<Prisma.TodoUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isCompleted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TodoCreateManyInputSchema: z.ZodType<Prisma.TodoCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      text: z.string(),
      isCompleted: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      userId: z.string(),
    })
    .strict();

export const TodoUpdateManyMutationInputSchema: z.ZodType<Prisma.TodoUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isCompleted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TodoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TodoUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isCompleted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    title: z.string(),
    content: z
      .union([
        z.lazy(() => NullableJsonNullValueInputSchema),
        InputJsonValueSchema,
      ])
      .optional(),
    published: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    author: z.lazy(() => UserCreateNestedOneWithoutPostInputSchema),
  })
  .strict();

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      title: z.string(),
      content: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      published: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      authorId: z.string(),
    })
    .strict();

export const PostUpdateInputSchema: z.ZodType<Prisma.PostUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().cuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([
        z.lazy(() => NullableJsonNullValueInputSchema),
        InputJsonValueSchema,
      ])
      .optional(),
    published: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    author: z
      .lazy(() => UserUpdateOneRequiredWithoutPostNestedInputSchema)
      .optional(),
  })
  .strict();

export const PostUncheckedUpdateInputSchema: z.ZodType<Prisma.PostUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      published: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      authorId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      title: z.string(),
      content: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      published: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      authorId: z.string(),
    })
    .strict();

export const PostUpdateManyMutationInputSchema: z.ZodType<Prisma.PostUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      published: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      published: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      authorId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z
  .object({
    is: z.lazy(() => UserWhereInputSchema).optional(),
    isNot: z.lazy(() => UserWhereInputSchema).optional(),
  })
  .strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> =
  z
    .object({
      provider: z.string(),
      providerAccountId: z.string(),
    })
    .strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      access_token: z.lazy(() => SortOrderSchema).optional(),
      expires_at: z.lazy(() => SortOrderSchema).optional(),
      token_type: z.lazy(() => SortOrderSchema).optional(),
      scope: z.lazy(() => SortOrderSchema).optional(),
      id_token: z.lazy(() => SortOrderSchema).optional(),
      session_state: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> =
  z
    .object({
      expires_at: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      access_token: z.lazy(() => SortOrderSchema).optional(),
      expires_at: z.lazy(() => SortOrderSchema).optional(),
      token_type: z.lazy(() => SortOrderSchema).optional(),
      scope: z.lazy(() => SortOrderSchema).optional(),
      id_token: z.lazy(() => SortOrderSchema).optional(),
      session_state: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      access_token: z.lazy(() => SortOrderSchema).optional(),
      expires_at: z.lazy(() => SortOrderSchema).optional(),
      token_type: z.lazy(() => SortOrderSchema).optional(),
      scope: z.lazy(() => SortOrderSchema).optional(),
      id_token: z.lazy(() => SortOrderSchema).optional(),
      session_state: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> =
  z
    .object({
      expires_at: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })
  .strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> =
  z
    .object({
      identifier: z.string(),
      token: z.string(),
    })
    .strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> =
  z
    .object({
      identifier: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> =
  z
    .object({
      identifier: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> =
  z
    .object({
      identifier: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z
  .object({
    equals: InputJsonValueSchema.optional(),
    path: z.string().optional(),
    string_contains: z.string().optional(),
    string_starts_with: z.string().optional(),
    string_ends_with: z.string().optional(),
    array_contains: InputJsonValueSchema.optional().nullable(),
    array_starts_with: InputJsonValueSchema.optional().nullable(),
    array_ends_with: InputJsonValueSchema.optional().nullable(),
    lt: InputJsonValueSchema.optional(),
    lte: InputJsonValueSchema.optional(),
    gt: InputJsonValueSchema.optional(),
    gte: InputJsonValueSchema.optional(),
    not: InputJsonValueSchema.optional(),
  })
  .strict();

export const UserProfileNullableRelationFilterSchema: z.ZodType<Prisma.UserProfileNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => UserProfileWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => UserProfileWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> =
  z
    .object({
      every: z.lazy(() => AccountWhereInputSchema).optional(),
      some: z.lazy(() => AccountWhereInputSchema).optional(),
      none: z.lazy(() => AccountWhereInputSchema).optional(),
    })
    .strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> =
  z
    .object({
      every: z.lazy(() => SessionWhereInputSchema).optional(),
      some: z.lazy(() => SessionWhereInputSchema).optional(),
      none: z.lazy(() => SessionWhereInputSchema).optional(),
    })
    .strict();

export const TodoListRelationFilterSchema: z.ZodType<Prisma.TodoListRelationFilter> =
  z
    .object({
      every: z.lazy(() => TodoWhereInputSchema).optional(),
      some: z.lazy(() => TodoWhereInputSchema).optional(),
      none: z.lazy(() => TodoWhereInputSchema).optional(),
    })
    .strict();

export const PostListRelationFilterSchema: z.ZodType<Prisma.PostListRelationFilter> =
  z
    .object({
      every: z.lazy(() => PostWhereInputSchema).optional(),
      some: z.lazy(() => PostWhereInputSchema).optional(),
      none: z.lazy(() => PostWhereInputSchema).optional(),
    })
    .strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TodoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TodoOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PostOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      interests: z.lazy(() => SortOrderSchema).optional(),
      specialization: z.lazy(() => SortOrderSchema).optional(),
      portfolio: z.lazy(() => SortOrderSchema).optional(),
      availability: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
      stripeSubscriptionId: z.lazy(() => SortOrderSchema).optional(),
      stripePriceId: z.lazy(() => SortOrderSchema).optional(),
      stripeCurrentPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      interests: z.lazy(() => SortOrderSchema).optional(),
      specialization: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
      stripeSubscriptionId: z.lazy(() => SortOrderSchema).optional(),
      stripePriceId: z.lazy(() => SortOrderSchema).optional(),
      stripeCurrentPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      interests: z.lazy(() => SortOrderSchema).optional(),
      specialization: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
      stripeSubscriptionId: z.lazy(() => SortOrderSchema).optional(),
      stripePriceId: z.lazy(() => SortOrderSchema).optional(),
      stripeCurrentPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> =
  z
    .object({
      equals: InputJsonValueSchema.optional(),
      path: z.string().optional(),
      string_contains: z.string().optional(),
      string_starts_with: z.string().optional(),
      string_ends_with: z.string().optional(),
      array_contains: InputJsonValueSchema.optional().nullable(),
      array_starts_with: InputJsonValueSchema.optional().nullable(),
      array_ends_with: InputJsonValueSchema.optional().nullable(),
      lt: InputJsonValueSchema.optional(),
      lte: InputJsonValueSchema.optional(),
      gt: InputJsonValueSchema.optional(),
      gte: InputJsonValueSchema.optional(),
      not: InputJsonValueSchema.optional(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
    })
    .strict();

export const PortfolioListRelationFilterSchema: z.ZodType<Prisma.PortfolioListRelationFilter> =
  z
    .object({
      every: z.lazy(() => PortfolioWhereInputSchema).optional(),
      some: z.lazy(() => PortfolioWhereInputSchema).optional(),
      none: z.lazy(() => PortfolioWhereInputSchema).optional(),
    })
    .strict();

export const PhotographySkillListRelationFilterSchema: z.ZodType<Prisma.PhotographySkillListRelationFilter> =
  z
    .object({
      every: z.lazy(() => PhotographySkillWhereInputSchema).optional(),
      some: z.lazy(() => PhotographySkillWhereInputSchema).optional(),
      none: z.lazy(() => PhotographySkillWhereInputSchema).optional(),
    })
    .strict();

export const PhotoShootTypeListRelationFilterSchema: z.ZodType<Prisma.PhotoShootTypeListRelationFilter> =
  z
    .object({
      every: z.lazy(() => PhotoShootTypeWhereInputSchema).optional(),
      some: z.lazy(() => PhotoShootTypeWhereInputSchema).optional(),
      none: z.lazy(() => PhotoShootTypeWhereInputSchema).optional(),
    })
    .strict();

export const PortfolioOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PortfolioOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PhotographySkillOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PhotographySkillOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PhotoShootTypeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PhotoShootTypeOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserProfileCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserProfileMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserProfileMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserProfileRelationFilterSchema: z.ZodType<Prisma.UserProfileRelationFilter> =
  z
    .object({
      is: z.lazy(() => UserProfileWhereInputSchema).optional(),
      isNot: z.lazy(() => UserProfileWhereInputSchema).optional(),
    })
    .strict();

export const PortfolioCountOrderByAggregateInputSchema: z.ZodType<Prisma.PortfolioCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PortfolioMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PortfolioMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PortfolioMinOrderByAggregateInputSchema: z.ZodType<Prisma.PortfolioMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const EnumPhotoShootTypeNameFilterSchema: z.ZodType<Prisma.EnumPhotoShootTypeNameFilter> =
  z
    .object({
      equals: z.lazy(() => PhotoShootTypeNameSchema).optional(),
      in: z
        .lazy(() => PhotoShootTypeNameSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => PhotoShootTypeNameSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => PhotoShootTypeNameSchema),
          z.lazy(() => NestedEnumPhotoShootTypeNameFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const UserProfileListRelationFilterSchema: z.ZodType<Prisma.UserProfileListRelationFilter> =
  z
    .object({
      every: z.lazy(() => UserProfileWhereInputSchema).optional(),
      some: z.lazy(() => UserProfileWhereInputSchema).optional(),
      none: z.lazy(() => UserProfileWhereInputSchema).optional(),
    })
    .strict();

export const UserProfileOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserProfileOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PhotoShootTypeCountOrderByAggregateInputSchema: z.ZodType<Prisma.PhotoShootTypeCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PhotoShootTypeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PhotoShootTypeAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PhotoShootTypeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PhotoShootTypeMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PhotoShootTypeMinOrderByAggregateInputSchema: z.ZodType<Prisma.PhotoShootTypeMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PhotoShootTypeSumOrderByAggregateInputSchema: z.ZodType<Prisma.PhotoShootTypeSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const EnumPhotoShootTypeNameWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPhotoShootTypeNameWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => PhotoShootTypeNameSchema).optional(),
      in: z
        .lazy(() => PhotoShootTypeNameSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => PhotoShootTypeNameSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => PhotoShootTypeNameSchema),
          z.lazy(() => NestedEnumPhotoShootTypeNameWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumPhotoShootTypeNameFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumPhotoShootTypeNameFilterSchema).optional(),
    })
    .strict();

export const EnumPhotographySkillNameFilterSchema: z.ZodType<Prisma.EnumPhotographySkillNameFilter> =
  z
    .object({
      equals: z.lazy(() => PhotographySkillNameSchema).optional(),
      in: z
        .lazy(() => PhotographySkillNameSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => PhotographySkillNameSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => PhotographySkillNameSchema),
          z.lazy(() => NestedEnumPhotographySkillNameFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const EnumPhotographySkillTypeFilterSchema: z.ZodType<Prisma.EnumPhotographySkillTypeFilter> =
  z
    .object({
      equals: z.lazy(() => PhotographySkillTypeSchema).optional(),
      in: z
        .lazy(() => PhotographySkillTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => PhotographySkillTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => PhotographySkillTypeSchema),
          z.lazy(() => NestedEnumPhotographySkillTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const PhotographySkillCountOrderByAggregateInputSchema: z.ZodType<Prisma.PhotographySkillCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      skillType: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PhotographySkillAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PhotographySkillAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PhotographySkillMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PhotographySkillMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      skillType: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PhotographySkillMinOrderByAggregateInputSchema: z.ZodType<Prisma.PhotographySkillMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      skillType: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PhotographySkillSumOrderByAggregateInputSchema: z.ZodType<Prisma.PhotographySkillSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumPhotographySkillNameWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPhotographySkillNameWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => PhotographySkillNameSchema).optional(),
      in: z
        .lazy(() => PhotographySkillNameSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => PhotographySkillNameSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => PhotographySkillNameSchema),
          z.lazy(
            () => NestedEnumPhotographySkillNameWithAggregatesFilterSchema
          ),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumPhotographySkillNameFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumPhotographySkillNameFilterSchema).optional(),
    })
    .strict();

export const EnumPhotographySkillTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPhotographySkillTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => PhotographySkillTypeSchema).optional(),
      in: z
        .lazy(() => PhotographySkillTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => PhotographySkillTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => PhotographySkillTypeSchema),
          z.lazy(
            () => NestedEnumPhotographySkillTypeWithAggregatesFilterSchema
          ),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumPhotographySkillTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumPhotographySkillTypeFilterSchema).optional(),
    })
    .strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict();

export const TodoCountOrderByAggregateInputSchema: z.ZodType<Prisma.TodoCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      isCompleted: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TodoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TodoMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      isCompleted: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TodoMinOrderByAggregateInputSchema: z.ZodType<Prisma.TodoMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      isCompleted: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    })
    .strict();

export const PostCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      content: z.lazy(() => SortOrderSchema).optional(),
      published: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      authorId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      published: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      authorId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      published: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      authorId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutAccountInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutAccountInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutAccountNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutAccountInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutAccountInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutAccountInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutAccountInputSchema),
          z.lazy(() => UserUpdateWithoutAccountInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutSessionInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSessionInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutSessionInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutSessionInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutSessionNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSessionInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutSessionInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutSessionInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutSessionInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutSessionInputSchema),
          z.lazy(() => UserUpdateWithoutSessionInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutSessionInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserProfileCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.UserProfileCreateNestedOneWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserProfileCreateWithoutUserInputSchema),
          z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserProfileCreateOrConnectWithoutUserInputSchema)
        .optional(),
      connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional(),
    })
    .strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TodoCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TodoCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TodoCreateWithoutUserInputSchema),
          z.lazy(() => TodoCreateWithoutUserInputSchema).array(),
          z.lazy(() => TodoUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => TodoUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TodoCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => TodoCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => TodoCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => TodoWhereUniqueInputSchema),
          z.lazy(() => TodoWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutAuthorInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutAuthorInputSchema),
          z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PostCreateManyAuthorInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserProfileUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateNestedOneWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserProfileCreateWithoutUserInputSchema),
          z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserProfileCreateOrConnectWithoutUserInputSchema)
        .optional(),
      connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional(),
    })
    .strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TodoUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TodoUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TodoCreateWithoutUserInputSchema),
          z.lazy(() => TodoCreateWithoutUserInputSchema).array(),
          z.lazy(() => TodoUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => TodoUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TodoCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => TodoCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => TodoCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => TodoWhereUniqueInputSchema),
          z.lazy(() => TodoWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutAuthorInputSchema),
          z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PostCreateManyAuthorInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional().nullable(),
    })
    .strict();

export const UserProfileUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.UserProfileUpdateOneWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserProfileCreateWithoutUserInputSchema),
          z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserProfileCreateOrConnectWithoutUserInputSchema)
        .optional(),
      upsert: z.lazy(() => UserProfileUpsertWithoutUserInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => UserProfileWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => UserProfileWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserProfileUpdateToOneWithWhereWithoutUserInputSchema),
          z.lazy(() => UserProfileUpdateWithoutUserInputSchema),
          z.lazy(() => UserProfileUncheckedUpdateWithoutUserInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AccountScalarWhereInputSchema),
          z.lazy(() => AccountScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SessionScalarWhereInputSchema),
          z.lazy(() => SessionScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TodoUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TodoUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TodoCreateWithoutUserInputSchema),
          z.lazy(() => TodoCreateWithoutUserInputSchema).array(),
          z.lazy(() => TodoUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => TodoUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TodoCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => TodoCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TodoUpsertWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => TodoUpsertWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => TodoCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => TodoWhereUniqueInputSchema),
          z.lazy(() => TodoWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TodoWhereUniqueInputSchema),
          z.lazy(() => TodoWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TodoWhereUniqueInputSchema),
          z.lazy(() => TodoWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TodoWhereUniqueInputSchema),
          z.lazy(() => TodoWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TodoUpdateWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => TodoUpdateWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TodoUpdateManyWithWhereWithoutUserInputSchema),
          z.lazy(() => TodoUpdateManyWithWhereWithoutUserInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TodoScalarWhereInputSchema),
          z.lazy(() => TodoScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutAuthorNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutAuthorInputSchema),
          z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema),
          z
            .lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PostCreateManyAuthorInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema),
          z
            .lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema),
          z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PostScalarWhereInputSchema),
          z.lazy(() => PostScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserProfileUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateOneWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserProfileCreateWithoutUserInputSchema),
          z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserProfileCreateOrConnectWithoutUserInputSchema)
        .optional(),
      upsert: z.lazy(() => UserProfileUpsertWithoutUserInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => UserProfileWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => UserProfileWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserProfileUpdateToOneWithWhereWithoutUserInputSchema),
          z.lazy(() => UserProfileUpdateWithoutUserInputSchema),
          z.lazy(() => UserProfileUncheckedUpdateWithoutUserInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AccountScalarWhereInputSchema),
          z.lazy(() => AccountScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SessionScalarWhereInputSchema),
          z.lazy(() => SessionScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TodoUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TodoUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TodoCreateWithoutUserInputSchema),
          z.lazy(() => TodoCreateWithoutUserInputSchema).array(),
          z.lazy(() => TodoUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => TodoUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TodoCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => TodoCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TodoUpsertWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => TodoUpsertWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => TodoCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => TodoWhereUniqueInputSchema),
          z.lazy(() => TodoWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TodoWhereUniqueInputSchema),
          z.lazy(() => TodoWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TodoWhereUniqueInputSchema),
          z.lazy(() => TodoWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TodoWhereUniqueInputSchema),
          z.lazy(() => TodoWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TodoUpdateWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => TodoUpdateWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TodoUpdateManyWithWhereWithoutUserInputSchema),
          z.lazy(() => TodoUpdateManyWithWhereWithoutUserInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TodoScalarWhereInputSchema),
          z.lazy(() => TodoScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutAuthorInputSchema),
          z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema),
          z
            .lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PostCreateManyAuthorInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema),
          z
            .lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema),
          z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PostScalarWhereInputSchema),
          z.lazy(() => PostScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutUserProfileInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUserProfileInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutUserProfileInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutUserProfileInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutUserProfileInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const PortfolioCreateNestedManyWithoutUserProfileInputSchema: z.ZodType<Prisma.PortfolioCreateNestedManyWithoutUserProfileInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PortfolioCreateWithoutUserProfileInputSchema),
          z.lazy(() => PortfolioCreateWithoutUserProfileInputSchema).array(),
          z.lazy(() => PortfolioUncheckedCreateWithoutUserProfileInputSchema),
          z
            .lazy(() => PortfolioUncheckedCreateWithoutUserProfileInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PortfolioCreateOrConnectWithoutUserProfileInputSchema),
          z
            .lazy(() => PortfolioCreateOrConnectWithoutUserProfileInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PortfolioCreateManyUserProfileInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PortfolioWhereUniqueInputSchema),
          z.lazy(() => PortfolioWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PhotographySkillCreateNestedManyWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotographySkillCreateNestedManyWithoutUserProfileInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PhotographySkillCreateWithoutUserProfileInputSchema),
          z
            .lazy(() => PhotographySkillCreateWithoutUserProfileInputSchema)
            .array(),
          z.lazy(
            () => PhotographySkillUncheckedCreateWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PhotographySkillUncheckedCreateWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => PhotographySkillCreateOrConnectWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PhotographySkillCreateOrConnectWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PhotographySkillWhereUniqueInputSchema),
          z.lazy(() => PhotographySkillWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PhotoShootTypeCreateNestedManyWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotoShootTypeCreateNestedManyWithoutUserProfileInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PhotoShootTypeCreateWithoutUserProfileInputSchema),
          z
            .lazy(() => PhotoShootTypeCreateWithoutUserProfileInputSchema)
            .array(),
          z.lazy(
            () => PhotoShootTypeUncheckedCreateWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PhotoShootTypeUncheckedCreateWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => PhotoShootTypeCreateOrConnectWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PhotoShootTypeCreateOrConnectWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema),
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PortfolioUncheckedCreateNestedManyWithoutUserProfileInputSchema: z.ZodType<Prisma.PortfolioUncheckedCreateNestedManyWithoutUserProfileInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PortfolioCreateWithoutUserProfileInputSchema),
          z.lazy(() => PortfolioCreateWithoutUserProfileInputSchema).array(),
          z.lazy(() => PortfolioUncheckedCreateWithoutUserProfileInputSchema),
          z
            .lazy(() => PortfolioUncheckedCreateWithoutUserProfileInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PortfolioCreateOrConnectWithoutUserProfileInputSchema),
          z
            .lazy(() => PortfolioCreateOrConnectWithoutUserProfileInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PortfolioCreateManyUserProfileInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PortfolioWhereUniqueInputSchema),
          z.lazy(() => PortfolioWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PhotographySkillUncheckedCreateNestedManyWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotographySkillUncheckedCreateNestedManyWithoutUserProfileInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PhotographySkillCreateWithoutUserProfileInputSchema),
          z
            .lazy(() => PhotographySkillCreateWithoutUserProfileInputSchema)
            .array(),
          z.lazy(
            () => PhotographySkillUncheckedCreateWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PhotographySkillUncheckedCreateWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => PhotographySkillCreateOrConnectWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PhotographySkillCreateOrConnectWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PhotographySkillWhereUniqueInputSchema),
          z.lazy(() => PhotographySkillWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PhotoShootTypeUncheckedCreateNestedManyWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotoShootTypeUncheckedCreateNestedManyWithoutUserProfileInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PhotoShootTypeCreateWithoutUserProfileInputSchema),
          z
            .lazy(() => PhotoShootTypeCreateWithoutUserProfileInputSchema)
            .array(),
          z.lazy(
            () => PhotoShootTypeUncheckedCreateWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PhotoShootTypeUncheckedCreateWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => PhotoShootTypeCreateOrConnectWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PhotoShootTypeCreateOrConnectWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema),
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutUserProfileNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUserProfileNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutUserProfileInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutUserProfileInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutUserProfileInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutUserProfileInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutUserProfileInputSchema),
          z.lazy(() => UserUpdateWithoutUserProfileInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutUserProfileInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PortfolioUpdateManyWithoutUserProfileNestedInputSchema: z.ZodType<Prisma.PortfolioUpdateManyWithoutUserProfileNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PortfolioCreateWithoutUserProfileInputSchema),
          z.lazy(() => PortfolioCreateWithoutUserProfileInputSchema).array(),
          z.lazy(() => PortfolioUncheckedCreateWithoutUserProfileInputSchema),
          z
            .lazy(() => PortfolioUncheckedCreateWithoutUserProfileInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PortfolioCreateOrConnectWithoutUserProfileInputSchema),
          z
            .lazy(() => PortfolioCreateOrConnectWithoutUserProfileInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => PortfolioUpsertWithWhereUniqueWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PortfolioUpsertWithWhereUniqueWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PortfolioCreateManyUserProfileInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => PortfolioWhereUniqueInputSchema),
          z.lazy(() => PortfolioWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PortfolioWhereUniqueInputSchema),
          z.lazy(() => PortfolioWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PortfolioWhereUniqueInputSchema),
          z.lazy(() => PortfolioWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PortfolioWhereUniqueInputSchema),
          z.lazy(() => PortfolioWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => PortfolioUpdateWithWhereUniqueWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PortfolioUpdateWithWhereUniqueWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => PortfolioUpdateManyWithWhereWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PortfolioUpdateManyWithWhereWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PortfolioScalarWhereInputSchema),
          z.lazy(() => PortfolioScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PhotographySkillUpdateManyWithoutUserProfileNestedInputSchema: z.ZodType<Prisma.PhotographySkillUpdateManyWithoutUserProfileNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PhotographySkillCreateWithoutUserProfileInputSchema),
          z
            .lazy(() => PhotographySkillCreateWithoutUserProfileInputSchema)
            .array(),
          z.lazy(
            () => PhotographySkillUncheckedCreateWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PhotographySkillUncheckedCreateWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => PhotographySkillCreateOrConnectWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PhotographySkillCreateOrConnectWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              PhotographySkillUpsertWithWhereUniqueWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () =>
                PhotographySkillUpsertWithWhereUniqueWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => PhotographySkillWhereUniqueInputSchema),
          z.lazy(() => PhotographySkillWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PhotographySkillWhereUniqueInputSchema),
          z.lazy(() => PhotographySkillWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PhotographySkillWhereUniqueInputSchema),
          z.lazy(() => PhotographySkillWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PhotographySkillWhereUniqueInputSchema),
          z.lazy(() => PhotographySkillWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              PhotographySkillUpdateWithWhereUniqueWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () =>
                PhotographySkillUpdateWithWhereUniqueWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              PhotographySkillUpdateManyWithWhereWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () =>
                PhotographySkillUpdateManyWithWhereWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PhotographySkillScalarWhereInputSchema),
          z.lazy(() => PhotographySkillScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PhotoShootTypeUpdateManyWithoutUserProfileNestedInputSchema: z.ZodType<Prisma.PhotoShootTypeUpdateManyWithoutUserProfileNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PhotoShootTypeCreateWithoutUserProfileInputSchema),
          z
            .lazy(() => PhotoShootTypeCreateWithoutUserProfileInputSchema)
            .array(),
          z.lazy(
            () => PhotoShootTypeUncheckedCreateWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PhotoShootTypeUncheckedCreateWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => PhotoShootTypeCreateOrConnectWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PhotoShootTypeCreateOrConnectWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              PhotoShootTypeUpsertWithWhereUniqueWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () =>
                PhotoShootTypeUpsertWithWhereUniqueWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema),
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema),
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema),
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema),
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              PhotoShootTypeUpdateWithWhereUniqueWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () =>
                PhotoShootTypeUpdateWithWhereUniqueWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => PhotoShootTypeUpdateManyWithWhereWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () =>
                PhotoShootTypeUpdateManyWithWhereWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PhotoShootTypeScalarWhereInputSchema),
          z.lazy(() => PhotoShootTypeScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PortfolioUncheckedUpdateManyWithoutUserProfileNestedInputSchema: z.ZodType<Prisma.PortfolioUncheckedUpdateManyWithoutUserProfileNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PortfolioCreateWithoutUserProfileInputSchema),
          z.lazy(() => PortfolioCreateWithoutUserProfileInputSchema).array(),
          z.lazy(() => PortfolioUncheckedCreateWithoutUserProfileInputSchema),
          z
            .lazy(() => PortfolioUncheckedCreateWithoutUserProfileInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PortfolioCreateOrConnectWithoutUserProfileInputSchema),
          z
            .lazy(() => PortfolioCreateOrConnectWithoutUserProfileInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => PortfolioUpsertWithWhereUniqueWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PortfolioUpsertWithWhereUniqueWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PortfolioCreateManyUserProfileInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => PortfolioWhereUniqueInputSchema),
          z.lazy(() => PortfolioWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PortfolioWhereUniqueInputSchema),
          z.lazy(() => PortfolioWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PortfolioWhereUniqueInputSchema),
          z.lazy(() => PortfolioWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PortfolioWhereUniqueInputSchema),
          z.lazy(() => PortfolioWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => PortfolioUpdateWithWhereUniqueWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PortfolioUpdateWithWhereUniqueWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => PortfolioUpdateManyWithWhereWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PortfolioUpdateManyWithWhereWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PortfolioScalarWhereInputSchema),
          z.lazy(() => PortfolioScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PhotographySkillUncheckedUpdateManyWithoutUserProfileNestedInputSchema: z.ZodType<Prisma.PhotographySkillUncheckedUpdateManyWithoutUserProfileNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PhotographySkillCreateWithoutUserProfileInputSchema),
          z
            .lazy(() => PhotographySkillCreateWithoutUserProfileInputSchema)
            .array(),
          z.lazy(
            () => PhotographySkillUncheckedCreateWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PhotographySkillUncheckedCreateWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => PhotographySkillCreateOrConnectWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PhotographySkillCreateOrConnectWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              PhotographySkillUpsertWithWhereUniqueWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () =>
                PhotographySkillUpsertWithWhereUniqueWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => PhotographySkillWhereUniqueInputSchema),
          z.lazy(() => PhotographySkillWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PhotographySkillWhereUniqueInputSchema),
          z.lazy(() => PhotographySkillWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PhotographySkillWhereUniqueInputSchema),
          z.lazy(() => PhotographySkillWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PhotographySkillWhereUniqueInputSchema),
          z.lazy(() => PhotographySkillWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              PhotographySkillUpdateWithWhereUniqueWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () =>
                PhotographySkillUpdateWithWhereUniqueWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              PhotographySkillUpdateManyWithWhereWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () =>
                PhotographySkillUpdateManyWithWhereWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PhotographySkillScalarWhereInputSchema),
          z.lazy(() => PhotographySkillScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PhotoShootTypeUncheckedUpdateManyWithoutUserProfileNestedInputSchema: z.ZodType<Prisma.PhotoShootTypeUncheckedUpdateManyWithoutUserProfileNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PhotoShootTypeCreateWithoutUserProfileInputSchema),
          z
            .lazy(() => PhotoShootTypeCreateWithoutUserProfileInputSchema)
            .array(),
          z.lazy(
            () => PhotoShootTypeUncheckedCreateWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PhotoShootTypeUncheckedCreateWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => PhotoShootTypeCreateOrConnectWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () => PhotoShootTypeCreateOrConnectWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              PhotoShootTypeUpsertWithWhereUniqueWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () =>
                PhotoShootTypeUpsertWithWhereUniqueWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema),
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema),
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema),
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema),
          z.lazy(() => PhotoShootTypeWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              PhotoShootTypeUpdateWithWhereUniqueWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () =>
                PhotoShootTypeUpdateWithWhereUniqueWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => PhotoShootTypeUpdateManyWithWhereWithoutUserProfileInputSchema
          ),
          z
            .lazy(
              () =>
                PhotoShootTypeUpdateManyWithWhereWithoutUserProfileInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PhotoShootTypeScalarWhereInputSchema),
          z.lazy(() => PhotoShootTypeScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserProfileCreateNestedOneWithoutPortfolioInputSchema: z.ZodType<Prisma.UserProfileCreateNestedOneWithoutPortfolioInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserProfileCreateWithoutPortfolioInputSchema),
          z.lazy(() => UserProfileUncheckedCreateWithoutPortfolioInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserProfileCreateOrConnectWithoutPortfolioInputSchema)
        .optional(),
      connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional(),
    })
    .strict();

export const UserProfileUpdateOneRequiredWithoutPortfolioNestedInputSchema: z.ZodType<Prisma.UserProfileUpdateOneRequiredWithoutPortfolioNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserProfileCreateWithoutPortfolioInputSchema),
          z.lazy(() => UserProfileUncheckedCreateWithoutPortfolioInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserProfileCreateOrConnectWithoutPortfolioInputSchema)
        .optional(),
      upsert: z
        .lazy(() => UserProfileUpsertWithoutPortfolioInputSchema)
        .optional(),
      connect: z.lazy(() => UserProfileWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => UserProfileUpdateToOneWithWhereWithoutPortfolioInputSchema
          ),
          z.lazy(() => UserProfileUpdateWithoutPortfolioInputSchema),
          z.lazy(() => UserProfileUncheckedUpdateWithoutPortfolioInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserProfileCreateNestedManyWithoutPhotoShootTypesInputSchema: z.ZodType<Prisma.UserProfileCreateNestedManyWithoutPhotoShootTypesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserProfileCreateWithoutPhotoShootTypesInputSchema),
          z
            .lazy(() => UserProfileCreateWithoutPhotoShootTypesInputSchema)
            .array(),
          z.lazy(
            () => UserProfileUncheckedCreateWithoutPhotoShootTypesInputSchema
          ),
          z
            .lazy(
              () => UserProfileUncheckedCreateWithoutPhotoShootTypesInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => UserProfileCreateOrConnectWithoutPhotoShootTypesInputSchema
          ),
          z
            .lazy(
              () => UserProfileCreateOrConnectWithoutPhotoShootTypesInputSchema
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserProfileUncheckedCreateNestedManyWithoutPhotoShootTypesInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateNestedManyWithoutPhotoShootTypesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserProfileCreateWithoutPhotoShootTypesInputSchema),
          z
            .lazy(() => UserProfileCreateWithoutPhotoShootTypesInputSchema)
            .array(),
          z.lazy(
            () => UserProfileUncheckedCreateWithoutPhotoShootTypesInputSchema
          ),
          z
            .lazy(
              () => UserProfileUncheckedCreateWithoutPhotoShootTypesInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => UserProfileCreateOrConnectWithoutPhotoShootTypesInputSchema
          ),
          z
            .lazy(
              () => UserProfileCreateOrConnectWithoutPhotoShootTypesInputSchema
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const EnumPhotoShootTypeNameFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPhotoShootTypeNameFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => PhotoShootTypeNameSchema).optional(),
    })
    .strict();

export const UserProfileUpdateManyWithoutPhotoShootTypesNestedInputSchema: z.ZodType<Prisma.UserProfileUpdateManyWithoutPhotoShootTypesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserProfileCreateWithoutPhotoShootTypesInputSchema),
          z
            .lazy(() => UserProfileCreateWithoutPhotoShootTypesInputSchema)
            .array(),
          z.lazy(
            () => UserProfileUncheckedCreateWithoutPhotoShootTypesInputSchema
          ),
          z
            .lazy(
              () => UserProfileUncheckedCreateWithoutPhotoShootTypesInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => UserProfileCreateOrConnectWithoutPhotoShootTypesInputSchema
          ),
          z
            .lazy(
              () => UserProfileCreateOrConnectWithoutPhotoShootTypesInputSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              UserProfileUpsertWithWhereUniqueWithoutPhotoShootTypesInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileUpsertWithWhereUniqueWithoutPhotoShootTypesInputSchema
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              UserProfileUpdateWithWhereUniqueWithoutPhotoShootTypesInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileUpdateWithWhereUniqueWithoutPhotoShootTypesInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              UserProfileUpdateManyWithWhereWithoutPhotoShootTypesInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileUpdateManyWithWhereWithoutPhotoShootTypesInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserProfileScalarWhereInputSchema),
          z.lazy(() => UserProfileScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const UserProfileUncheckedUpdateManyWithoutPhotoShootTypesNestedInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateManyWithoutPhotoShootTypesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserProfileCreateWithoutPhotoShootTypesInputSchema),
          z
            .lazy(() => UserProfileCreateWithoutPhotoShootTypesInputSchema)
            .array(),
          z.lazy(
            () => UserProfileUncheckedCreateWithoutPhotoShootTypesInputSchema
          ),
          z
            .lazy(
              () => UserProfileUncheckedCreateWithoutPhotoShootTypesInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => UserProfileCreateOrConnectWithoutPhotoShootTypesInputSchema
          ),
          z
            .lazy(
              () => UserProfileCreateOrConnectWithoutPhotoShootTypesInputSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              UserProfileUpsertWithWhereUniqueWithoutPhotoShootTypesInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileUpsertWithWhereUniqueWithoutPhotoShootTypesInputSchema
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              UserProfileUpdateWithWhereUniqueWithoutPhotoShootTypesInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileUpdateWithWhereUniqueWithoutPhotoShootTypesInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              UserProfileUpdateManyWithWhereWithoutPhotoShootTypesInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileUpdateManyWithWhereWithoutPhotoShootTypesInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserProfileScalarWhereInputSchema),
          z.lazy(() => UserProfileScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserProfileCreateNestedManyWithoutPhotographySkillsInputSchema: z.ZodType<Prisma.UserProfileCreateNestedManyWithoutPhotographySkillsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserProfileCreateWithoutPhotographySkillsInputSchema),
          z
            .lazy(() => UserProfileCreateWithoutPhotographySkillsInputSchema)
            .array(),
          z.lazy(
            () => UserProfileUncheckedCreateWithoutPhotographySkillsInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileUncheckedCreateWithoutPhotographySkillsInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => UserProfileCreateOrConnectWithoutPhotographySkillsInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileCreateOrConnectWithoutPhotographySkillsInputSchema
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserProfileUncheckedCreateNestedManyWithoutPhotographySkillsInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateNestedManyWithoutPhotographySkillsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserProfileCreateWithoutPhotographySkillsInputSchema),
          z
            .lazy(() => UserProfileCreateWithoutPhotographySkillsInputSchema)
            .array(),
          z.lazy(
            () => UserProfileUncheckedCreateWithoutPhotographySkillsInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileUncheckedCreateWithoutPhotographySkillsInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => UserProfileCreateOrConnectWithoutPhotographySkillsInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileCreateOrConnectWithoutPhotographySkillsInputSchema
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const EnumPhotographySkillNameFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPhotographySkillNameFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => PhotographySkillNameSchema).optional(),
    })
    .strict();

export const EnumPhotographySkillTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPhotographySkillTypeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => PhotographySkillTypeSchema).optional(),
    })
    .strict();

export const UserProfileUpdateManyWithoutPhotographySkillsNestedInputSchema: z.ZodType<Prisma.UserProfileUpdateManyWithoutPhotographySkillsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserProfileCreateWithoutPhotographySkillsInputSchema),
          z
            .lazy(() => UserProfileCreateWithoutPhotographySkillsInputSchema)
            .array(),
          z.lazy(
            () => UserProfileUncheckedCreateWithoutPhotographySkillsInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileUncheckedCreateWithoutPhotographySkillsInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => UserProfileCreateOrConnectWithoutPhotographySkillsInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileCreateOrConnectWithoutPhotographySkillsInputSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              UserProfileUpsertWithWhereUniqueWithoutPhotographySkillsInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileUpsertWithWhereUniqueWithoutPhotographySkillsInputSchema
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              UserProfileUpdateWithWhereUniqueWithoutPhotographySkillsInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileUpdateWithWhereUniqueWithoutPhotographySkillsInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              UserProfileUpdateManyWithWhereWithoutPhotographySkillsInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileUpdateManyWithWhereWithoutPhotographySkillsInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserProfileScalarWhereInputSchema),
          z.lazy(() => UserProfileScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserProfileUncheckedUpdateManyWithoutPhotographySkillsNestedInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateManyWithoutPhotographySkillsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserProfileCreateWithoutPhotographySkillsInputSchema),
          z
            .lazy(() => UserProfileCreateWithoutPhotographySkillsInputSchema)
            .array(),
          z.lazy(
            () => UserProfileUncheckedCreateWithoutPhotographySkillsInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileUncheckedCreateWithoutPhotographySkillsInputSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => UserProfileCreateOrConnectWithoutPhotographySkillsInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileCreateOrConnectWithoutPhotographySkillsInputSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              UserProfileUpsertWithWhereUniqueWithoutPhotographySkillsInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileUpsertWithWhereUniqueWithoutPhotographySkillsInputSchema
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserProfileWhereUniqueInputSchema),
          z.lazy(() => UserProfileWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              UserProfileUpdateWithWhereUniqueWithoutPhotographySkillsInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileUpdateWithWhereUniqueWithoutPhotographySkillsInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              UserProfileUpdateManyWithWhereWithoutPhotographySkillsInputSchema
          ),
          z
            .lazy(
              () =>
                UserProfileUpdateManyWithWhereWithoutPhotographySkillsInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserProfileScalarWhereInputSchema),
          z.lazy(() => UserProfileScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutTodoInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTodoInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutTodoInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutTodoInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutTodoInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
  z
    .object({
      set: z.boolean().optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutTodoNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTodoNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutTodoInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutTodoInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutTodoInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutTodoInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutTodoInputSchema),
          z.lazy(() => UserUpdateWithoutTodoInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutTodoInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutPostInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPostInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutPostInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutPostInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutPostInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutPostNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPostNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutPostInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutPostInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutPostInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutPostInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutPostInputSchema),
          z.lazy(() => UserUpdateWithoutPostInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutPostInputSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
        .optional(),
    })
    .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> =
  z
    .object({
      equals: InputJsonValueSchema.optional(),
      path: z.string().optional(),
      string_contains: z.string().optional(),
      string_starts_with: z.string().optional(),
      string_ends_with: z.string().optional(),
      array_contains: InputJsonValueSchema.optional().nullable(),
      array_starts_with: InputJsonValueSchema.optional().nullable(),
      array_ends_with: InputJsonValueSchema.optional().nullable(),
      lt: InputJsonValueSchema.optional(),
      lte: InputJsonValueSchema.optional(),
      gt: InputJsonValueSchema.optional(),
      gte: InputJsonValueSchema.optional(),
      not: InputJsonValueSchema.optional(),
    })
    .strict();

export const NestedEnumPhotoShootTypeNameFilterSchema: z.ZodType<Prisma.NestedEnumPhotoShootTypeNameFilter> =
  z
    .object({
      equals: z.lazy(() => PhotoShootTypeNameSchema).optional(),
      in: z
        .lazy(() => PhotoShootTypeNameSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => PhotoShootTypeNameSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => PhotoShootTypeNameSchema),
          z.lazy(() => NestedEnumPhotoShootTypeNameFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedEnumPhotoShootTypeNameWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPhotoShootTypeNameWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => PhotoShootTypeNameSchema).optional(),
      in: z
        .lazy(() => PhotoShootTypeNameSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => PhotoShootTypeNameSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => PhotoShootTypeNameSchema),
          z.lazy(() => NestedEnumPhotoShootTypeNameWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumPhotoShootTypeNameFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumPhotoShootTypeNameFilterSchema).optional(),
    })
    .strict();

export const NestedEnumPhotographySkillNameFilterSchema: z.ZodType<Prisma.NestedEnumPhotographySkillNameFilter> =
  z
    .object({
      equals: z.lazy(() => PhotographySkillNameSchema).optional(),
      in: z
        .lazy(() => PhotographySkillNameSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => PhotographySkillNameSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => PhotographySkillNameSchema),
          z.lazy(() => NestedEnumPhotographySkillNameFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumPhotographySkillTypeFilterSchema: z.ZodType<Prisma.NestedEnumPhotographySkillTypeFilter> =
  z
    .object({
      equals: z.lazy(() => PhotographySkillTypeSchema).optional(),
      in: z
        .lazy(() => PhotographySkillTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => PhotographySkillTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => PhotographySkillTypeSchema),
          z.lazy(() => NestedEnumPhotographySkillTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumPhotographySkillNameWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPhotographySkillNameWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => PhotographySkillNameSchema).optional(),
      in: z
        .lazy(() => PhotographySkillNameSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => PhotographySkillNameSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => PhotographySkillNameSchema),
          z.lazy(
            () => NestedEnumPhotographySkillNameWithAggregatesFilterSchema
          ),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumPhotographySkillNameFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumPhotographySkillNameFilterSchema).optional(),
    })
    .strict();

export const NestedEnumPhotographySkillTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPhotographySkillTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => PhotographySkillTypeSchema).optional(),
      in: z
        .lazy(() => PhotographySkillTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => PhotographySkillTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => PhotographySkillTypeSchema),
          z.lazy(
            () => NestedEnumPhotographySkillTypeWithAggregatesFilterSchema
          ),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumPhotographySkillTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumPhotographySkillTypeFilterSchema).optional(),
    })
    .strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    })
    .strict();

export const UserCreateWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().optional().nullable(),
      email: z.string(),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      interests: z.string().optional().nullable(),
      specialization: z.string().optional().nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      stripeCustomerId: z.string().optional().nullable(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
      UserProfile: z
        .lazy(() => UserProfileCreateNestedOneWithoutUserInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Todo: z.lazy(() => TodoCreateNestedManyWithoutUserInputSchema).optional(),
      Post: z
        .lazy(() => PostCreateNestedManyWithoutAuthorInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutAccountInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().optional().nullable(),
      email: z.string(),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      interests: z.string().optional().nullable(),
      specialization: z.string().optional().nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      stripeCustomerId: z.string().optional().nullable(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
      UserProfile: z
        .lazy(() => UserProfileUncheckedCreateNestedOneWithoutUserInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Todo: z
        .lazy(() => TodoUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Post: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutAccountInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithoutAccountInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutAccountInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutAccountInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const UserUpdateToOneWithWhereWithoutAccountInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutAccountInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutAccountInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      interests: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      specialization: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      UserProfile: z
        .lazy(() => UserProfileUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Todo: z.lazy(() => TodoUpdateManyWithoutUserNestedInputSchema).optional(),
      Post: z
        .lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutAccountInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      interests: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      specialization: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      UserProfile: z
        .lazy(() => UserProfileUncheckedUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Todo: z
        .lazy(() => TodoUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Post: z
        .lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateWithoutSessionInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().optional().nullable(),
      email: z.string(),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      interests: z.string().optional().nullable(),
      specialization: z.string().optional().nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      stripeCustomerId: z.string().optional().nullable(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
      UserProfile: z
        .lazy(() => UserProfileCreateNestedOneWithoutUserInputSchema)
        .optional(),
      Account: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Todo: z.lazy(() => TodoCreateNestedManyWithoutUserInputSchema).optional(),
      Post: z
        .lazy(() => PostCreateNestedManyWithoutAuthorInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutSessionInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().optional().nullable(),
      email: z.string(),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      interests: z.string().optional().nullable(),
      specialization: z.string().optional().nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      stripeCustomerId: z.string().optional().nullable(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
      UserProfile: z
        .lazy(() => UserProfileUncheckedCreateNestedOneWithoutUserInputSchema)
        .optional(),
      Account: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Todo: z
        .lazy(() => TodoUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Post: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutSessionInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutSessionInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutSessionInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithoutSessionInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutSessionInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSessionInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutSessionInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutSessionInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const UserUpdateToOneWithWhereWithoutSessionInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutSessionInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSessionInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutSessionInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      interests: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      specialization: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      UserProfile: z
        .lazy(() => UserProfileUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      Account: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Todo: z.lazy(() => TodoUpdateManyWithoutUserNestedInputSchema).optional(),
      Post: z
        .lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutSessionInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      interests: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      specialization: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      UserProfile: z
        .lazy(() => UserProfileUncheckedUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      Account: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Todo: z
        .lazy(() => TodoUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Post: z
        .lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserProfileCreateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileCreateWithoutUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      Portfolio: z
        .lazy(() => PortfolioCreateNestedManyWithoutUserProfileInputSchema)
        .optional(),
      photographySkills: z
        .lazy(
          () => PhotographySkillCreateNestedManyWithoutUserProfileInputSchema
        )
        .optional(),
      photoShootTypes: z
        .lazy(() => PhotoShootTypeCreateNestedManyWithoutUserProfileInputSchema)
        .optional(),
    })
    .strict();

export const UserProfileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      Portfolio: z
        .lazy(
          () => PortfolioUncheckedCreateNestedManyWithoutUserProfileInputSchema
        )
        .optional(),
      photographySkills: z
        .lazy(
          () =>
            PhotographySkillUncheckedCreateNestedManyWithoutUserProfileInputSchema
        )
        .optional(),
      photoShootTypes: z
        .lazy(
          () =>
            PhotoShootTypeUncheckedCreateNestedManyWithoutUserProfileInputSchema
        )
        .optional(),
    })
    .strict();

export const UserProfileCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserProfileCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => UserProfileWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserProfileCreateWithoutUserInputSchema),
        z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().optional().nullable(),
      access_token: z.string().optional().nullable(),
      expires_at: z.number().int().optional().nullable(),
      token_type: z.string().optional().nullable(),
      scope: z.string().optional().nullable(),
      id_token: z.string().optional().nullable(),
      session_state: z.string().optional().nullable(),
    })
    .strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().optional().nullable(),
      access_token: z.string().optional().nullable(),
      expires_at: z.number().int().optional().nullable(),
      token_type: z.string().optional().nullable(),
      scope: z.string().optional().nullable(),
      id_token: z.string().optional().nullable(),
      session_state: z.string().optional().nullable(),
    })
    .strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => AccountCreateManyUserInputSchema),
        z.lazy(() => AccountCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      sessionToken: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      sessionToken: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => SessionCreateManyUserInputSchema),
        z.lazy(() => SessionCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const TodoCreateWithoutUserInputSchema: z.ZodType<Prisma.TodoCreateWithoutUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      text: z.string(),
      isCompleted: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const TodoUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TodoUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      text: z.string(),
      isCompleted: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const TodoCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TodoCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => TodoWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TodoCreateWithoutUserInputSchema),
        z.lazy(() => TodoUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const TodoCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TodoCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => TodoCreateManyUserInputSchema),
        z.lazy(() => TodoCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PostCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateWithoutAuthorInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      title: z.string(),
      content: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      published: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const PostUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      title: z.string(),
      content: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      published: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const PostCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutAuthorInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => PostCreateWithoutAuthorInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),
      ]),
    })
    .strict();

export const PostCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyAuthorInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => PostCreateManyAuthorInputSchema),
        z.lazy(() => PostCreateManyAuthorInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserProfileUpsertWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUpsertWithoutUserInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserProfileUpdateWithoutUserInputSchema),
        z.lazy(() => UserProfileUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserProfileCreateWithoutUserInputSchema),
        z.lazy(() => UserProfileUncheckedCreateWithoutUserInputSchema),
      ]),
      where: z.lazy(() => UserProfileWhereInputSchema).optional(),
    })
    .strict();

export const UserProfileUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUpdateToOneWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => UserProfileWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserProfileUpdateWithoutUserInputSchema),
        z.lazy(() => UserProfileUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const UserProfileUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Portfolio: z
        .lazy(() => PortfolioUpdateManyWithoutUserProfileNestedInputSchema)
        .optional(),
      photographySkills: z
        .lazy(
          () => PhotographySkillUpdateManyWithoutUserProfileNestedInputSchema
        )
        .optional(),
      photoShootTypes: z
        .lazy(() => PhotoShootTypeUpdateManyWithoutUserProfileNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserProfileUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Portfolio: z
        .lazy(
          () => PortfolioUncheckedUpdateManyWithoutUserProfileNestedInputSchema
        )
        .optional(),
      photographySkills: z
        .lazy(
          () =>
            PhotographySkillUncheckedUpdateManyWithoutUserProfileNestedInputSchema
        )
        .optional(),
      photoShootTypes: z
        .lazy(
          () =>
            PhotoShootTypeUncheckedUpdateManyWithoutUserProfileNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => AccountUpdateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => AccountUpdateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => AccountUpdateManyMutationInputSchema),
        z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AccountScalarWhereInputSchema),
          z.lazy(() => AccountScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AccountScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AccountScalarWhereInputSchema),
          z.lazy(() => AccountScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      provider: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      providerAccountId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      refresh_token: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      access_token: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      expires_at: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      token_type: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      scope: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      id_token: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      session_state: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => SessionUpdateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => SessionUpdateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => SessionUpdateManyMutationInputSchema),
        z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SessionScalarWhereInputSchema),
          z.lazy(() => SessionScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SessionScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SessionScalarWhereInputSchema),
          z.lazy(() => SessionScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      sessionToken: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      expires: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const TodoUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TodoUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => TodoWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TodoUpdateWithoutUserInputSchema),
        z.lazy(() => TodoUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TodoCreateWithoutUserInputSchema),
        z.lazy(() => TodoUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const TodoUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TodoUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => TodoWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TodoUpdateWithoutUserInputSchema),
        z.lazy(() => TodoUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const TodoUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TodoUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => TodoScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TodoUpdateManyMutationInputSchema),
        z.lazy(() => TodoUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export const TodoScalarWhereInputSchema: z.ZodType<Prisma.TodoScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TodoScalarWhereInputSchema),
          z.lazy(() => TodoScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TodoScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TodoScalarWhereInputSchema),
          z.lazy(() => TodoScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      isCompleted: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const PostUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => PostUpdateWithoutAuthorInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema),
      ]),
      create: z.union([
        z.lazy(() => PostCreateWithoutAuthorInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),
      ]),
    })
    .strict();

export const PostUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => PostUpdateWithoutAuthorInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema),
      ]),
    })
    .strict();

export const PostUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutAuthorInput> =
  z
    .object({
      where: z.lazy(() => PostScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => PostUpdateManyMutationInputSchema),
        z.lazy(() => PostUncheckedUpdateManyWithoutAuthorInputSchema),
      ]),
    })
    .strict();

export const PostScalarWhereInputSchema: z.ZodType<Prisma.PostScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PostScalarWhereInputSchema),
          z.lazy(() => PostScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PostScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PostScalarWhereInputSchema),
          z.lazy(() => PostScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      content: z.lazy(() => JsonNullableFilterSchema).optional(),
      published: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      authorId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const UserCreateWithoutUserProfileInputSchema: z.ZodType<Prisma.UserCreateWithoutUserProfileInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().optional().nullable(),
      email: z.string(),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      interests: z.string().optional().nullable(),
      specialization: z.string().optional().nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      stripeCustomerId: z.string().optional().nullable(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
      Account: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Todo: z.lazy(() => TodoCreateNestedManyWithoutUserInputSchema).optional(),
      Post: z
        .lazy(() => PostCreateNestedManyWithoutAuthorInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutUserProfileInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUserProfileInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().optional().nullable(),
      email: z.string(),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      interests: z.string().optional().nullable(),
      specialization: z.string().optional().nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      stripeCustomerId: z.string().optional().nullable(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
      Account: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Todo: z
        .lazy(() => TodoUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Post: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutUserProfileInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUserProfileInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutUserProfileInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutUserProfileInputSchema),
      ]),
    })
    .strict();

export const PortfolioCreateWithoutUserProfileInputSchema: z.ZodType<Prisma.PortfolioCreateWithoutUserProfileInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      image: z.string(),
    })
    .strict();

export const PortfolioUncheckedCreateWithoutUserProfileInputSchema: z.ZodType<Prisma.PortfolioUncheckedCreateWithoutUserProfileInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      image: z.string(),
    })
    .strict();

export const PortfolioCreateOrConnectWithoutUserProfileInputSchema: z.ZodType<Prisma.PortfolioCreateOrConnectWithoutUserProfileInput> =
  z
    .object({
      where: z.lazy(() => PortfolioWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => PortfolioCreateWithoutUserProfileInputSchema),
        z.lazy(() => PortfolioUncheckedCreateWithoutUserProfileInputSchema),
      ]),
    })
    .strict();

export const PortfolioCreateManyUserProfileInputEnvelopeSchema: z.ZodType<Prisma.PortfolioCreateManyUserProfileInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => PortfolioCreateManyUserProfileInputSchema),
        z.lazy(() => PortfolioCreateManyUserProfileInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PhotographySkillCreateWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotographySkillCreateWithoutUserProfileInput> =
  z
    .object({
      id: z.number().int(),
      name: z.lazy(() => PhotographySkillNameSchema),
      skillType: z.lazy(() => PhotographySkillTypeSchema),
    })
    .strict();

export const PhotographySkillUncheckedCreateWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotographySkillUncheckedCreateWithoutUserProfileInput> =
  z
    .object({
      id: z.number().int(),
      name: z.lazy(() => PhotographySkillNameSchema),
      skillType: z.lazy(() => PhotographySkillTypeSchema),
    })
    .strict();

export const PhotographySkillCreateOrConnectWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotographySkillCreateOrConnectWithoutUserProfileInput> =
  z
    .object({
      where: z.lazy(() => PhotographySkillWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => PhotographySkillCreateWithoutUserProfileInputSchema),
        z.lazy(
          () => PhotographySkillUncheckedCreateWithoutUserProfileInputSchema
        ),
      ]),
    })
    .strict();

export const PhotoShootTypeCreateWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotoShootTypeCreateWithoutUserProfileInput> =
  z
    .object({
      name: z.lazy(() => PhotoShootTypeNameSchema),
    })
    .strict();

export const PhotoShootTypeUncheckedCreateWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotoShootTypeUncheckedCreateWithoutUserProfileInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.lazy(() => PhotoShootTypeNameSchema),
    })
    .strict();

export const PhotoShootTypeCreateOrConnectWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotoShootTypeCreateOrConnectWithoutUserProfileInput> =
  z
    .object({
      where: z.lazy(() => PhotoShootTypeWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => PhotoShootTypeCreateWithoutUserProfileInputSchema),
        z.lazy(
          () => PhotoShootTypeUncheckedCreateWithoutUserProfileInputSchema
        ),
      ]),
    })
    .strict();

export const UserUpsertWithoutUserProfileInputSchema: z.ZodType<Prisma.UserUpsertWithoutUserProfileInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutUserProfileInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutUserProfileInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutUserProfileInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutUserProfileInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const UserUpdateToOneWithWhereWithoutUserProfileInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUserProfileInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutUserProfileInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutUserProfileInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutUserProfileInputSchema: z.ZodType<Prisma.UserUpdateWithoutUserProfileInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      interests: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      specialization: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Account: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Todo: z.lazy(() => TodoUpdateManyWithoutUserNestedInputSchema).optional(),
      Post: z
        .lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutUserProfileInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUserProfileInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      interests: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      specialization: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      Account: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Todo: z
        .lazy(() => TodoUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Post: z
        .lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema)
        .optional(),
    })
    .strict();

export const PortfolioUpsertWithWhereUniqueWithoutUserProfileInputSchema: z.ZodType<Prisma.PortfolioUpsertWithWhereUniqueWithoutUserProfileInput> =
  z
    .object({
      where: z.lazy(() => PortfolioWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => PortfolioUpdateWithoutUserProfileInputSchema),
        z.lazy(() => PortfolioUncheckedUpdateWithoutUserProfileInputSchema),
      ]),
      create: z.union([
        z.lazy(() => PortfolioCreateWithoutUserProfileInputSchema),
        z.lazy(() => PortfolioUncheckedCreateWithoutUserProfileInputSchema),
      ]),
    })
    .strict();

export const PortfolioUpdateWithWhereUniqueWithoutUserProfileInputSchema: z.ZodType<Prisma.PortfolioUpdateWithWhereUniqueWithoutUserProfileInput> =
  z
    .object({
      where: z.lazy(() => PortfolioWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => PortfolioUpdateWithoutUserProfileInputSchema),
        z.lazy(() => PortfolioUncheckedUpdateWithoutUserProfileInputSchema),
      ]),
    })
    .strict();

export const PortfolioUpdateManyWithWhereWithoutUserProfileInputSchema: z.ZodType<Prisma.PortfolioUpdateManyWithWhereWithoutUserProfileInput> =
  z
    .object({
      where: z.lazy(() => PortfolioScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => PortfolioUpdateManyMutationInputSchema),
        z.lazy(() => PortfolioUncheckedUpdateManyWithoutUserProfileInputSchema),
      ]),
    })
    .strict();

export const PortfolioScalarWhereInputSchema: z.ZodType<Prisma.PortfolioScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PortfolioScalarWhereInputSchema),
          z.lazy(() => PortfolioScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PortfolioScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PortfolioScalarWhereInputSchema),
          z.lazy(() => PortfolioScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      image: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    })
    .strict();

export const PhotographySkillUpsertWithWhereUniqueWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotographySkillUpsertWithWhereUniqueWithoutUserProfileInput> =
  z
    .object({
      where: z.lazy(() => PhotographySkillWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => PhotographySkillUpdateWithoutUserProfileInputSchema),
        z.lazy(
          () => PhotographySkillUncheckedUpdateWithoutUserProfileInputSchema
        ),
      ]),
      create: z.union([
        z.lazy(() => PhotographySkillCreateWithoutUserProfileInputSchema),
        z.lazy(
          () => PhotographySkillUncheckedCreateWithoutUserProfileInputSchema
        ),
      ]),
    })
    .strict();

export const PhotographySkillUpdateWithWhereUniqueWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotographySkillUpdateWithWhereUniqueWithoutUserProfileInput> =
  z
    .object({
      where: z.lazy(() => PhotographySkillWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => PhotographySkillUpdateWithoutUserProfileInputSchema),
        z.lazy(
          () => PhotographySkillUncheckedUpdateWithoutUserProfileInputSchema
        ),
      ]),
    })
    .strict();

export const PhotographySkillUpdateManyWithWhereWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotographySkillUpdateManyWithWhereWithoutUserProfileInput> =
  z
    .object({
      where: z.lazy(() => PhotographySkillScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => PhotographySkillUpdateManyMutationInputSchema),
        z.lazy(
          () => PhotographySkillUncheckedUpdateManyWithoutUserProfileInputSchema
        ),
      ]),
    })
    .strict();

export const PhotographySkillScalarWhereInputSchema: z.ZodType<Prisma.PhotographySkillScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PhotographySkillScalarWhereInputSchema),
          z.lazy(() => PhotographySkillScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PhotographySkillScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PhotographySkillScalarWhereInputSchema),
          z.lazy(() => PhotographySkillScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z
        .union([
          z.lazy(() => EnumPhotographySkillNameFilterSchema),
          z.lazy(() => PhotographySkillNameSchema),
        ])
        .optional(),
      skillType: z
        .union([
          z.lazy(() => EnumPhotographySkillTypeFilterSchema),
          z.lazy(() => PhotographySkillTypeSchema),
        ])
        .optional(),
    })
    .strict();

export const PhotoShootTypeUpsertWithWhereUniqueWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotoShootTypeUpsertWithWhereUniqueWithoutUserProfileInput> =
  z
    .object({
      where: z.lazy(() => PhotoShootTypeWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => PhotoShootTypeUpdateWithoutUserProfileInputSchema),
        z.lazy(
          () => PhotoShootTypeUncheckedUpdateWithoutUserProfileInputSchema
        ),
      ]),
      create: z.union([
        z.lazy(() => PhotoShootTypeCreateWithoutUserProfileInputSchema),
        z.lazy(
          () => PhotoShootTypeUncheckedCreateWithoutUserProfileInputSchema
        ),
      ]),
    })
    .strict();

export const PhotoShootTypeUpdateWithWhereUniqueWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotoShootTypeUpdateWithWhereUniqueWithoutUserProfileInput> =
  z
    .object({
      where: z.lazy(() => PhotoShootTypeWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => PhotoShootTypeUpdateWithoutUserProfileInputSchema),
        z.lazy(
          () => PhotoShootTypeUncheckedUpdateWithoutUserProfileInputSchema
        ),
      ]),
    })
    .strict();

export const PhotoShootTypeUpdateManyWithWhereWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotoShootTypeUpdateManyWithWhereWithoutUserProfileInput> =
  z
    .object({
      where: z.lazy(() => PhotoShootTypeScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => PhotoShootTypeUpdateManyMutationInputSchema),
        z.lazy(
          () => PhotoShootTypeUncheckedUpdateManyWithoutUserProfileInputSchema
        ),
      ]),
    })
    .strict();

export const PhotoShootTypeScalarWhereInputSchema: z.ZodType<Prisma.PhotoShootTypeScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PhotoShootTypeScalarWhereInputSchema),
          z.lazy(() => PhotoShootTypeScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PhotoShootTypeScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PhotoShootTypeScalarWhereInputSchema),
          z.lazy(() => PhotoShootTypeScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z
        .union([
          z.lazy(() => EnumPhotoShootTypeNameFilterSchema),
          z.lazy(() => PhotoShootTypeNameSchema),
        ])
        .optional(),
    })
    .strict();

export const UserProfileCreateWithoutPortfolioInputSchema: z.ZodType<Prisma.UserProfileCreateWithoutPortfolioInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      User: z.lazy(() => UserCreateNestedOneWithoutUserProfileInputSchema),
      photographySkills: z
        .lazy(
          () => PhotographySkillCreateNestedManyWithoutUserProfileInputSchema
        )
        .optional(),
      photoShootTypes: z
        .lazy(() => PhotoShootTypeCreateNestedManyWithoutUserProfileInputSchema)
        .optional(),
    })
    .strict();

export const UserProfileUncheckedCreateWithoutPortfolioInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateWithoutPortfolioInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      photographySkills: z
        .lazy(
          () =>
            PhotographySkillUncheckedCreateNestedManyWithoutUserProfileInputSchema
        )
        .optional(),
      photoShootTypes: z
        .lazy(
          () =>
            PhotoShootTypeUncheckedCreateNestedManyWithoutUserProfileInputSchema
        )
        .optional(),
    })
    .strict();

export const UserProfileCreateOrConnectWithoutPortfolioInputSchema: z.ZodType<Prisma.UserProfileCreateOrConnectWithoutPortfolioInput> =
  z
    .object({
      where: z.lazy(() => UserProfileWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserProfileCreateWithoutPortfolioInputSchema),
        z.lazy(() => UserProfileUncheckedCreateWithoutPortfolioInputSchema),
      ]),
    })
    .strict();

export const UserProfileUpsertWithoutPortfolioInputSchema: z.ZodType<Prisma.UserProfileUpsertWithoutPortfolioInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserProfileUpdateWithoutPortfolioInputSchema),
        z.lazy(() => UserProfileUncheckedUpdateWithoutPortfolioInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserProfileCreateWithoutPortfolioInputSchema),
        z.lazy(() => UserProfileUncheckedCreateWithoutPortfolioInputSchema),
      ]),
      where: z.lazy(() => UserProfileWhereInputSchema).optional(),
    })
    .strict();

export const UserProfileUpdateToOneWithWhereWithoutPortfolioInputSchema: z.ZodType<Prisma.UserProfileUpdateToOneWithWhereWithoutPortfolioInput> =
  z
    .object({
      where: z.lazy(() => UserProfileWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserProfileUpdateWithoutPortfolioInputSchema),
        z.lazy(() => UserProfileUncheckedUpdateWithoutPortfolioInputSchema),
      ]),
    })
    .strict();

export const UserProfileUpdateWithoutPortfolioInputSchema: z.ZodType<Prisma.UserProfileUpdateWithoutPortfolioInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      User: z
        .lazy(() => UserUpdateOneRequiredWithoutUserProfileNestedInputSchema)
        .optional(),
      photographySkills: z
        .lazy(
          () => PhotographySkillUpdateManyWithoutUserProfileNestedInputSchema
        )
        .optional(),
      photoShootTypes: z
        .lazy(() => PhotoShootTypeUpdateManyWithoutUserProfileNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserProfileUncheckedUpdateWithoutPortfolioInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateWithoutPortfolioInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      photographySkills: z
        .lazy(
          () =>
            PhotographySkillUncheckedUpdateManyWithoutUserProfileNestedInputSchema
        )
        .optional(),
      photoShootTypes: z
        .lazy(
          () =>
            PhotoShootTypeUncheckedUpdateManyWithoutUserProfileNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const UserProfileCreateWithoutPhotoShootTypesInputSchema: z.ZodType<Prisma.UserProfileCreateWithoutPhotoShootTypesInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      User: z.lazy(() => UserCreateNestedOneWithoutUserProfileInputSchema),
      Portfolio: z
        .lazy(() => PortfolioCreateNestedManyWithoutUserProfileInputSchema)
        .optional(),
      photographySkills: z
        .lazy(
          () => PhotographySkillCreateNestedManyWithoutUserProfileInputSchema
        )
        .optional(),
    })
    .strict();

export const UserProfileUncheckedCreateWithoutPhotoShootTypesInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateWithoutPhotoShootTypesInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      Portfolio: z
        .lazy(
          () => PortfolioUncheckedCreateNestedManyWithoutUserProfileInputSchema
        )
        .optional(),
      photographySkills: z
        .lazy(
          () =>
            PhotographySkillUncheckedCreateNestedManyWithoutUserProfileInputSchema
        )
        .optional(),
    })
    .strict();

export const UserProfileCreateOrConnectWithoutPhotoShootTypesInputSchema: z.ZodType<Prisma.UserProfileCreateOrConnectWithoutPhotoShootTypesInput> =
  z
    .object({
      where: z.lazy(() => UserProfileWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserProfileCreateWithoutPhotoShootTypesInputSchema),
        z.lazy(
          () => UserProfileUncheckedCreateWithoutPhotoShootTypesInputSchema
        ),
      ]),
    })
    .strict();

export const UserProfileUpsertWithWhereUniqueWithoutPhotoShootTypesInputSchema: z.ZodType<Prisma.UserProfileUpsertWithWhereUniqueWithoutPhotoShootTypesInput> =
  z
    .object({
      where: z.lazy(() => UserProfileWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => UserProfileUpdateWithoutPhotoShootTypesInputSchema),
        z.lazy(
          () => UserProfileUncheckedUpdateWithoutPhotoShootTypesInputSchema
        ),
      ]),
      create: z.union([
        z.lazy(() => UserProfileCreateWithoutPhotoShootTypesInputSchema),
        z.lazy(
          () => UserProfileUncheckedCreateWithoutPhotoShootTypesInputSchema
        ),
      ]),
    })
    .strict();

export const UserProfileUpdateWithWhereUniqueWithoutPhotoShootTypesInputSchema: z.ZodType<Prisma.UserProfileUpdateWithWhereUniqueWithoutPhotoShootTypesInput> =
  z
    .object({
      where: z.lazy(() => UserProfileWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => UserProfileUpdateWithoutPhotoShootTypesInputSchema),
        z.lazy(
          () => UserProfileUncheckedUpdateWithoutPhotoShootTypesInputSchema
        ),
      ]),
    })
    .strict();

export const UserProfileUpdateManyWithWhereWithoutPhotoShootTypesInputSchema: z.ZodType<Prisma.UserProfileUpdateManyWithWhereWithoutPhotoShootTypesInput> =
  z
    .object({
      where: z.lazy(() => UserProfileScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => UserProfileUpdateManyMutationInputSchema),
        z.lazy(
          () => UserProfileUncheckedUpdateManyWithoutPhotoShootTypesInputSchema
        ),
      ]),
    })
    .strict();

export const UserProfileScalarWhereInputSchema: z.ZodType<Prisma.UserProfileScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserProfileScalarWhereInputSchema),
          z.lazy(() => UserProfileScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserProfileScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserProfileScalarWhereInputSchema),
          z.lazy(() => UserProfileScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const UserProfileCreateWithoutPhotographySkillsInputSchema: z.ZodType<Prisma.UserProfileCreateWithoutPhotographySkillsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      User: z.lazy(() => UserCreateNestedOneWithoutUserProfileInputSchema),
      Portfolio: z
        .lazy(() => PortfolioCreateNestedManyWithoutUserProfileInputSchema)
        .optional(),
      photoShootTypes: z
        .lazy(() => PhotoShootTypeCreateNestedManyWithoutUserProfileInputSchema)
        .optional(),
    })
    .strict();

export const UserProfileUncheckedCreateWithoutPhotographySkillsInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateWithoutPhotographySkillsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      Portfolio: z
        .lazy(
          () => PortfolioUncheckedCreateNestedManyWithoutUserProfileInputSchema
        )
        .optional(),
      photoShootTypes: z
        .lazy(
          () =>
            PhotoShootTypeUncheckedCreateNestedManyWithoutUserProfileInputSchema
        )
        .optional(),
    })
    .strict();

export const UserProfileCreateOrConnectWithoutPhotographySkillsInputSchema: z.ZodType<Prisma.UserProfileCreateOrConnectWithoutPhotographySkillsInput> =
  z
    .object({
      where: z.lazy(() => UserProfileWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserProfileCreateWithoutPhotographySkillsInputSchema),
        z.lazy(
          () => UserProfileUncheckedCreateWithoutPhotographySkillsInputSchema
        ),
      ]),
    })
    .strict();

export const UserProfileUpsertWithWhereUniqueWithoutPhotographySkillsInputSchema: z.ZodType<Prisma.UserProfileUpsertWithWhereUniqueWithoutPhotographySkillsInput> =
  z
    .object({
      where: z.lazy(() => UserProfileWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => UserProfileUpdateWithoutPhotographySkillsInputSchema),
        z.lazy(
          () => UserProfileUncheckedUpdateWithoutPhotographySkillsInputSchema
        ),
      ]),
      create: z.union([
        z.lazy(() => UserProfileCreateWithoutPhotographySkillsInputSchema),
        z.lazy(
          () => UserProfileUncheckedCreateWithoutPhotographySkillsInputSchema
        ),
      ]),
    })
    .strict();

export const UserProfileUpdateWithWhereUniqueWithoutPhotographySkillsInputSchema: z.ZodType<Prisma.UserProfileUpdateWithWhereUniqueWithoutPhotographySkillsInput> =
  z
    .object({
      where: z.lazy(() => UserProfileWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => UserProfileUpdateWithoutPhotographySkillsInputSchema),
        z.lazy(
          () => UserProfileUncheckedUpdateWithoutPhotographySkillsInputSchema
        ),
      ]),
    })
    .strict();

export const UserProfileUpdateManyWithWhereWithoutPhotographySkillsInputSchema: z.ZodType<Prisma.UserProfileUpdateManyWithWhereWithoutPhotographySkillsInput> =
  z
    .object({
      where: z.lazy(() => UserProfileScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => UserProfileUpdateManyMutationInputSchema),
        z.lazy(
          () =>
            UserProfileUncheckedUpdateManyWithoutPhotographySkillsInputSchema
        ),
      ]),
    })
    .strict();

export const UserCreateWithoutTodoInputSchema: z.ZodType<Prisma.UserCreateWithoutTodoInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().optional().nullable(),
      email: z.string(),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      interests: z.string().optional().nullable(),
      specialization: z.string().optional().nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      stripeCustomerId: z.string().optional().nullable(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
      UserProfile: z
        .lazy(() => UserProfileCreateNestedOneWithoutUserInputSchema)
        .optional(),
      Account: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Post: z
        .lazy(() => PostCreateNestedManyWithoutAuthorInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutTodoInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTodoInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().optional().nullable(),
      email: z.string(),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      interests: z.string().optional().nullable(),
      specialization: z.string().optional().nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      stripeCustomerId: z.string().optional().nullable(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
      UserProfile: z
        .lazy(() => UserProfileUncheckedCreateNestedOneWithoutUserInputSchema)
        .optional(),
      Account: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Post: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutTodoInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTodoInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutTodoInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutTodoInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithoutTodoInputSchema: z.ZodType<Prisma.UserUpsertWithoutTodoInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutTodoInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutTodoInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutTodoInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutTodoInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const UserUpdateToOneWithWhereWithoutTodoInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTodoInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutTodoInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutTodoInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutTodoInputSchema: z.ZodType<Prisma.UserUpdateWithoutTodoInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      interests: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      specialization: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      UserProfile: z
        .lazy(() => UserProfileUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      Account: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Post: z
        .lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutTodoInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTodoInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      interests: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      specialization: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      UserProfile: z
        .lazy(() => UserProfileUncheckedUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      Account: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Post: z
        .lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateWithoutPostInputSchema: z.ZodType<Prisma.UserCreateWithoutPostInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().optional().nullable(),
      email: z.string(),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      interests: z.string().optional().nullable(),
      specialization: z.string().optional().nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      stripeCustomerId: z.string().optional().nullable(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
      UserProfile: z
        .lazy(() => UserProfileCreateNestedOneWithoutUserInputSchema)
        .optional(),
      Account: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Todo: z.lazy(() => TodoCreateNestedManyWithoutUserInputSchema).optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().optional().nullable(),
      email: z.string(),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      interests: z.string().optional().nullable(),
      specialization: z.string().optional().nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      stripeCustomerId: z.string().optional().nullable(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
      UserProfile: z
        .lazy(() => UserProfileUncheckedCreateNestedOneWithoutUserInputSchema)
        .optional(),
      Account: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      Todo: z
        .lazy(() => TodoUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPostInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutPostInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutPostInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithoutPostInputSchema: z.ZodType<Prisma.UserUpsertWithoutPostInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutPostInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutPostInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutPostInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutPostInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const UserUpdateToOneWithWhereWithoutPostInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPostInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutPostInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutPostInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutPostInputSchema: z.ZodType<Prisma.UserUpdateWithoutPostInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      interests: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      specialization: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      UserProfile: z
        .lazy(() => UserProfileUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      Account: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Todo: z.lazy(() => TodoUpdateManyWithoutUserNestedInputSchema).optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPostInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      interests: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      specialization: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      portfolio: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      availability: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      UserProfile: z
        .lazy(() => UserProfileUncheckedUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      Account: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Session: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      Todo: z
        .lazy(() => TodoUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().optional().nullable(),
      access_token: z.string().optional().nullable(),
      expires_at: z.number().int().optional().nullable(),
      token_type: z.string().optional().nullable(),
      scope: z.string().optional().nullable(),
      id_token: z.string().optional().nullable(),
      session_state: z.string().optional().nullable(),
    })
    .strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      sessionToken: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const TodoCreateManyUserInputSchema: z.ZodType<Prisma.TodoCreateManyUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      text: z.string(),
      isCompleted: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const PostCreateManyAuthorInputSchema: z.ZodType<Prisma.PostCreateManyAuthorInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      title: z.string(),
      content: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      published: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TodoUpdateWithoutUserInputSchema: z.ZodType<Prisma.TodoUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isCompleted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TodoUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TodoUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isCompleted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TodoUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.TodoUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isCompleted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PostUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithoutAuthorInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      published: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutAuthorInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      published: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      published: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PortfolioCreateManyUserProfileInputSchema: z.ZodType<Prisma.PortfolioCreateManyUserProfileInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      image: z.string(),
    })
    .strict();

export const PortfolioUpdateWithoutUserProfileInputSchema: z.ZodType<Prisma.PortfolioUpdateWithoutUserProfileInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PortfolioUncheckedUpdateWithoutUserProfileInputSchema: z.ZodType<Prisma.PortfolioUncheckedUpdateWithoutUserProfileInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PortfolioUncheckedUpdateManyWithoutUserProfileInputSchema: z.ZodType<Prisma.PortfolioUncheckedUpdateManyWithoutUserProfileInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PhotographySkillUpdateWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotographySkillUpdateWithoutUserProfileInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => PhotographySkillNameSchema),
          z.lazy(
            () => EnumPhotographySkillNameFieldUpdateOperationsInputSchema
          ),
        ])
        .optional(),
      skillType: z
        .union([
          z.lazy(() => PhotographySkillTypeSchema),
          z.lazy(
            () => EnumPhotographySkillTypeFieldUpdateOperationsInputSchema
          ),
        ])
        .optional(),
    })
    .strict();

export const PhotographySkillUncheckedUpdateWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotographySkillUncheckedUpdateWithoutUserProfileInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => PhotographySkillNameSchema),
          z.lazy(
            () => EnumPhotographySkillNameFieldUpdateOperationsInputSchema
          ),
        ])
        .optional(),
      skillType: z
        .union([
          z.lazy(() => PhotographySkillTypeSchema),
          z.lazy(
            () => EnumPhotographySkillTypeFieldUpdateOperationsInputSchema
          ),
        ])
        .optional(),
    })
    .strict();

export const PhotographySkillUncheckedUpdateManyWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotographySkillUncheckedUpdateManyWithoutUserProfileInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => PhotographySkillNameSchema),
          z.lazy(
            () => EnumPhotographySkillNameFieldUpdateOperationsInputSchema
          ),
        ])
        .optional(),
      skillType: z
        .union([
          z.lazy(() => PhotographySkillTypeSchema),
          z.lazy(
            () => EnumPhotographySkillTypeFieldUpdateOperationsInputSchema
          ),
        ])
        .optional(),
    })
    .strict();

export const PhotoShootTypeUpdateWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotoShootTypeUpdateWithoutUserProfileInput> =
  z
    .object({
      name: z
        .union([
          z.lazy(() => PhotoShootTypeNameSchema),
          z.lazy(() => EnumPhotoShootTypeNameFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PhotoShootTypeUncheckedUpdateWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotoShootTypeUncheckedUpdateWithoutUserProfileInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => PhotoShootTypeNameSchema),
          z.lazy(() => EnumPhotoShootTypeNameFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PhotoShootTypeUncheckedUpdateManyWithoutUserProfileInputSchema: z.ZodType<Prisma.PhotoShootTypeUncheckedUpdateManyWithoutUserProfileInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => PhotoShootTypeNameSchema),
          z.lazy(() => EnumPhotoShootTypeNameFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserProfileUpdateWithoutPhotoShootTypesInputSchema: z.ZodType<Prisma.UserProfileUpdateWithoutPhotoShootTypesInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      User: z
        .lazy(() => UserUpdateOneRequiredWithoutUserProfileNestedInputSchema)
        .optional(),
      Portfolio: z
        .lazy(() => PortfolioUpdateManyWithoutUserProfileNestedInputSchema)
        .optional(),
      photographySkills: z
        .lazy(
          () => PhotographySkillUpdateManyWithoutUserProfileNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const UserProfileUncheckedUpdateWithoutPhotoShootTypesInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateWithoutPhotoShootTypesInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Portfolio: z
        .lazy(
          () => PortfolioUncheckedUpdateManyWithoutUserProfileNestedInputSchema
        )
        .optional(),
      photographySkills: z
        .lazy(
          () =>
            PhotographySkillUncheckedUpdateManyWithoutUserProfileNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const UserProfileUncheckedUpdateManyWithoutPhotoShootTypesInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateManyWithoutPhotoShootTypesInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserProfileUpdateWithoutPhotographySkillsInputSchema: z.ZodType<Prisma.UserProfileUpdateWithoutPhotographySkillsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      User: z
        .lazy(() => UserUpdateOneRequiredWithoutUserProfileNestedInputSchema)
        .optional(),
      Portfolio: z
        .lazy(() => PortfolioUpdateManyWithoutUserProfileNestedInputSchema)
        .optional(),
      photoShootTypes: z
        .lazy(() => PhotoShootTypeUpdateManyWithoutUserProfileNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserProfileUncheckedUpdateWithoutPhotographySkillsInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateWithoutPhotographySkillsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Portfolio: z
        .lazy(
          () => PortfolioUncheckedUpdateManyWithoutUserProfileNestedInputSchema
        )
        .optional(),
      photoShootTypes: z
        .lazy(
          () =>
            PhotoShootTypeUncheckedUpdateManyWithoutUserProfileNestedInputSchema
        )
        .optional(),
    })
    .strict();

export const UserProfileUncheckedUpdateManyWithoutPhotographySkillsInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateManyWithoutPhotographySkillsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> =
  z
    .object({
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z
  .object({
    where: AccountWhereInputSchema.optional(),
    orderBy: z
      .union([
        AccountOrderByWithAggregationInputSchema.array(),
        AccountOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: AccountScalarFieldEnumSchema.array(),
    having: AccountScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereUniqueInputSchema,
    })
    .strict();

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereUniqueInputSchema,
    })
    .strict();

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SessionScalarFieldEnumSchema,
          SessionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SessionScalarFieldEnumSchema,
          SessionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SessionScalarFieldEnumSchema,
          SessionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> =
  z
    .object({
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z
  .object({
    where: SessionWhereInputSchema.optional(),
    orderBy: z
      .union([
        SessionOrderByWithAggregationInputSchema.array(),
        SessionOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: SessionScalarFieldEnumSchema.array(),
    having: SessionScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereUniqueInputSchema,
    })
    .strict();

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereUniqueInputSchema,
    })
    .strict();

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithRelationInputSchema.array(),
          VerificationTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationTokenWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VerificationTokenScalarFieldEnumSchema,
          VerificationTokenScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithRelationInputSchema.array(),
          VerificationTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationTokenWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VerificationTokenScalarFieldEnumSchema,
          VerificationTokenScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithRelationInputSchema.array(),
          VerificationTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationTokenWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VerificationTokenScalarFieldEnumSchema,
          VerificationTokenScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> =
  z
    .object({
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithRelationInputSchema.array(),
          VerificationTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationTokenWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> =
  z
    .object({
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithAggregationInputSchema.array(),
          VerificationTokenOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: VerificationTokenScalarFieldEnumSchema.array(),
      having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereUniqueInputSchema,
    })
    .strict();

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereUniqueInputSchema,
    })
    .strict();

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserOrderByWithRelationInputSchema.array(),
          UserOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputSchema.array(),
        UserOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereUniqueInputSchema,
    })
    .strict();

export const UserProfileFindFirstArgsSchema: z.ZodType<Prisma.UserProfileFindFirstArgs> =
  z
    .object({
      select: UserProfileSelectSchema.optional(),
      include: UserProfileIncludeSchema.optional(),
      where: UserProfileWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserProfileOrderByWithRelationInputSchema.array(),
          UserProfileOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserProfileWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UserProfileScalarFieldEnumSchema,
          UserProfileScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UserProfileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserProfileFindFirstOrThrowArgs> =
  z
    .object({
      select: UserProfileSelectSchema.optional(),
      include: UserProfileIncludeSchema.optional(),
      where: UserProfileWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserProfileOrderByWithRelationInputSchema.array(),
          UserProfileOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserProfileWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UserProfileScalarFieldEnumSchema,
          UserProfileScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UserProfileFindManyArgsSchema: z.ZodType<Prisma.UserProfileFindManyArgs> =
  z
    .object({
      select: UserProfileSelectSchema.optional(),
      include: UserProfileIncludeSchema.optional(),
      where: UserProfileWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserProfileOrderByWithRelationInputSchema.array(),
          UserProfileOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserProfileWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UserProfileScalarFieldEnumSchema,
          UserProfileScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UserProfileAggregateArgsSchema: z.ZodType<Prisma.UserProfileAggregateArgs> =
  z
    .object({
      where: UserProfileWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserProfileOrderByWithRelationInputSchema.array(),
          UserProfileOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserProfileWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const UserProfileGroupByArgsSchema: z.ZodType<Prisma.UserProfileGroupByArgs> =
  z
    .object({
      where: UserProfileWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserProfileOrderByWithAggregationInputSchema.array(),
          UserProfileOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: UserProfileScalarFieldEnumSchema.array(),
      having: UserProfileScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const UserProfileFindUniqueArgsSchema: z.ZodType<Prisma.UserProfileFindUniqueArgs> =
  z
    .object({
      select: UserProfileSelectSchema.optional(),
      include: UserProfileIncludeSchema.optional(),
      where: UserProfileWhereUniqueInputSchema,
    })
    .strict();

export const UserProfileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserProfileFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserProfileSelectSchema.optional(),
      include: UserProfileIncludeSchema.optional(),
      where: UserProfileWhereUniqueInputSchema,
    })
    .strict();

export const PortfolioFindFirstArgsSchema: z.ZodType<Prisma.PortfolioFindFirstArgs> =
  z
    .object({
      select: PortfolioSelectSchema.optional(),
      include: PortfolioIncludeSchema.optional(),
      where: PortfolioWhereInputSchema.optional(),
      orderBy: z
        .union([
          PortfolioOrderByWithRelationInputSchema.array(),
          PortfolioOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PortfolioWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          PortfolioScalarFieldEnumSchema,
          PortfolioScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const PortfolioFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PortfolioFindFirstOrThrowArgs> =
  z
    .object({
      select: PortfolioSelectSchema.optional(),
      include: PortfolioIncludeSchema.optional(),
      where: PortfolioWhereInputSchema.optional(),
      orderBy: z
        .union([
          PortfolioOrderByWithRelationInputSchema.array(),
          PortfolioOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PortfolioWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          PortfolioScalarFieldEnumSchema,
          PortfolioScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const PortfolioFindManyArgsSchema: z.ZodType<Prisma.PortfolioFindManyArgs> =
  z
    .object({
      select: PortfolioSelectSchema.optional(),
      include: PortfolioIncludeSchema.optional(),
      where: PortfolioWhereInputSchema.optional(),
      orderBy: z
        .union([
          PortfolioOrderByWithRelationInputSchema.array(),
          PortfolioOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PortfolioWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          PortfolioScalarFieldEnumSchema,
          PortfolioScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const PortfolioAggregateArgsSchema: z.ZodType<Prisma.PortfolioAggregateArgs> =
  z
    .object({
      where: PortfolioWhereInputSchema.optional(),
      orderBy: z
        .union([
          PortfolioOrderByWithRelationInputSchema.array(),
          PortfolioOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PortfolioWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const PortfolioGroupByArgsSchema: z.ZodType<Prisma.PortfolioGroupByArgs> =
  z
    .object({
      where: PortfolioWhereInputSchema.optional(),
      orderBy: z
        .union([
          PortfolioOrderByWithAggregationInputSchema.array(),
          PortfolioOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: PortfolioScalarFieldEnumSchema.array(),
      having: PortfolioScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const PortfolioFindUniqueArgsSchema: z.ZodType<Prisma.PortfolioFindUniqueArgs> =
  z
    .object({
      select: PortfolioSelectSchema.optional(),
      include: PortfolioIncludeSchema.optional(),
      where: PortfolioWhereUniqueInputSchema,
    })
    .strict();

export const PortfolioFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PortfolioFindUniqueOrThrowArgs> =
  z
    .object({
      select: PortfolioSelectSchema.optional(),
      include: PortfolioIncludeSchema.optional(),
      where: PortfolioWhereUniqueInputSchema,
    })
    .strict();

export const PhotoShootTypeFindFirstArgsSchema: z.ZodType<Prisma.PhotoShootTypeFindFirstArgs> =
  z
    .object({
      select: PhotoShootTypeSelectSchema.optional(),
      include: PhotoShootTypeIncludeSchema.optional(),
      where: PhotoShootTypeWhereInputSchema.optional(),
      orderBy: z
        .union([
          PhotoShootTypeOrderByWithRelationInputSchema.array(),
          PhotoShootTypeOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PhotoShootTypeWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          PhotoShootTypeScalarFieldEnumSchema,
          PhotoShootTypeScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const PhotoShootTypeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PhotoShootTypeFindFirstOrThrowArgs> =
  z
    .object({
      select: PhotoShootTypeSelectSchema.optional(),
      include: PhotoShootTypeIncludeSchema.optional(),
      where: PhotoShootTypeWhereInputSchema.optional(),
      orderBy: z
        .union([
          PhotoShootTypeOrderByWithRelationInputSchema.array(),
          PhotoShootTypeOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PhotoShootTypeWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          PhotoShootTypeScalarFieldEnumSchema,
          PhotoShootTypeScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const PhotoShootTypeFindManyArgsSchema: z.ZodType<Prisma.PhotoShootTypeFindManyArgs> =
  z
    .object({
      select: PhotoShootTypeSelectSchema.optional(),
      include: PhotoShootTypeIncludeSchema.optional(),
      where: PhotoShootTypeWhereInputSchema.optional(),
      orderBy: z
        .union([
          PhotoShootTypeOrderByWithRelationInputSchema.array(),
          PhotoShootTypeOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PhotoShootTypeWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          PhotoShootTypeScalarFieldEnumSchema,
          PhotoShootTypeScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const PhotoShootTypeAggregateArgsSchema: z.ZodType<Prisma.PhotoShootTypeAggregateArgs> =
  z
    .object({
      where: PhotoShootTypeWhereInputSchema.optional(),
      orderBy: z
        .union([
          PhotoShootTypeOrderByWithRelationInputSchema.array(),
          PhotoShootTypeOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PhotoShootTypeWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const PhotoShootTypeGroupByArgsSchema: z.ZodType<Prisma.PhotoShootTypeGroupByArgs> =
  z
    .object({
      where: PhotoShootTypeWhereInputSchema.optional(),
      orderBy: z
        .union([
          PhotoShootTypeOrderByWithAggregationInputSchema.array(),
          PhotoShootTypeOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: PhotoShootTypeScalarFieldEnumSchema.array(),
      having: PhotoShootTypeScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const PhotoShootTypeFindUniqueArgsSchema: z.ZodType<Prisma.PhotoShootTypeFindUniqueArgs> =
  z
    .object({
      select: PhotoShootTypeSelectSchema.optional(),
      include: PhotoShootTypeIncludeSchema.optional(),
      where: PhotoShootTypeWhereUniqueInputSchema,
    })
    .strict();

export const PhotoShootTypeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PhotoShootTypeFindUniqueOrThrowArgs> =
  z
    .object({
      select: PhotoShootTypeSelectSchema.optional(),
      include: PhotoShootTypeIncludeSchema.optional(),
      where: PhotoShootTypeWhereUniqueInputSchema,
    })
    .strict();

export const PhotographySkillFindFirstArgsSchema: z.ZodType<Prisma.PhotographySkillFindFirstArgs> =
  z
    .object({
      select: PhotographySkillSelectSchema.optional(),
      include: PhotographySkillIncludeSchema.optional(),
      where: PhotographySkillWhereInputSchema.optional(),
      orderBy: z
        .union([
          PhotographySkillOrderByWithRelationInputSchema.array(),
          PhotographySkillOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PhotographySkillWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          PhotographySkillScalarFieldEnumSchema,
          PhotographySkillScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const PhotographySkillFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PhotographySkillFindFirstOrThrowArgs> =
  z
    .object({
      select: PhotographySkillSelectSchema.optional(),
      include: PhotographySkillIncludeSchema.optional(),
      where: PhotographySkillWhereInputSchema.optional(),
      orderBy: z
        .union([
          PhotographySkillOrderByWithRelationInputSchema.array(),
          PhotographySkillOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PhotographySkillWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          PhotographySkillScalarFieldEnumSchema,
          PhotographySkillScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const PhotographySkillFindManyArgsSchema: z.ZodType<Prisma.PhotographySkillFindManyArgs> =
  z
    .object({
      select: PhotographySkillSelectSchema.optional(),
      include: PhotographySkillIncludeSchema.optional(),
      where: PhotographySkillWhereInputSchema.optional(),
      orderBy: z
        .union([
          PhotographySkillOrderByWithRelationInputSchema.array(),
          PhotographySkillOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PhotographySkillWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          PhotographySkillScalarFieldEnumSchema,
          PhotographySkillScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const PhotographySkillAggregateArgsSchema: z.ZodType<Prisma.PhotographySkillAggregateArgs> =
  z
    .object({
      where: PhotographySkillWhereInputSchema.optional(),
      orderBy: z
        .union([
          PhotographySkillOrderByWithRelationInputSchema.array(),
          PhotographySkillOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PhotographySkillWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const PhotographySkillGroupByArgsSchema: z.ZodType<Prisma.PhotographySkillGroupByArgs> =
  z
    .object({
      where: PhotographySkillWhereInputSchema.optional(),
      orderBy: z
        .union([
          PhotographySkillOrderByWithAggregationInputSchema.array(),
          PhotographySkillOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: PhotographySkillScalarFieldEnumSchema.array(),
      having: PhotographySkillScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const PhotographySkillFindUniqueArgsSchema: z.ZodType<Prisma.PhotographySkillFindUniqueArgs> =
  z
    .object({
      select: PhotographySkillSelectSchema.optional(),
      include: PhotographySkillIncludeSchema.optional(),
      where: PhotographySkillWhereUniqueInputSchema,
    })
    .strict();

export const PhotographySkillFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PhotographySkillFindUniqueOrThrowArgs> =
  z
    .object({
      select: PhotographySkillSelectSchema.optional(),
      include: PhotographySkillIncludeSchema.optional(),
      where: PhotographySkillWhereUniqueInputSchema,
    })
    .strict();

export const TodoFindFirstArgsSchema: z.ZodType<Prisma.TodoFindFirstArgs> = z
  .object({
    select: TodoSelectSchema.optional(),
    include: TodoIncludeSchema.optional(),
    where: TodoWhereInputSchema.optional(),
    orderBy: z
      .union([
        TodoOrderByWithRelationInputSchema.array(),
        TodoOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: TodoWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TodoScalarFieldEnumSchema, TodoScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const TodoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TodoFindFirstOrThrowArgs> =
  z
    .object({
      select: TodoSelectSchema.optional(),
      include: TodoIncludeSchema.optional(),
      where: TodoWhereInputSchema.optional(),
      orderBy: z
        .union([
          TodoOrderByWithRelationInputSchema.array(),
          TodoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TodoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([TodoScalarFieldEnumSchema, TodoScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const TodoFindManyArgsSchema: z.ZodType<Prisma.TodoFindManyArgs> = z
  .object({
    select: TodoSelectSchema.optional(),
    include: TodoIncludeSchema.optional(),
    where: TodoWhereInputSchema.optional(),
    orderBy: z
      .union([
        TodoOrderByWithRelationInputSchema.array(),
        TodoOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: TodoWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TodoScalarFieldEnumSchema, TodoScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const TodoAggregateArgsSchema: z.ZodType<Prisma.TodoAggregateArgs> = z
  .object({
    where: TodoWhereInputSchema.optional(),
    orderBy: z
      .union([
        TodoOrderByWithRelationInputSchema.array(),
        TodoOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: TodoWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const TodoGroupByArgsSchema: z.ZodType<Prisma.TodoGroupByArgs> = z
  .object({
    where: TodoWhereInputSchema.optional(),
    orderBy: z
      .union([
        TodoOrderByWithAggregationInputSchema.array(),
        TodoOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: TodoScalarFieldEnumSchema.array(),
    having: TodoScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const TodoFindUniqueArgsSchema: z.ZodType<Prisma.TodoFindUniqueArgs> = z
  .object({
    select: TodoSelectSchema.optional(),
    include: TodoIncludeSchema.optional(),
    where: TodoWhereUniqueInputSchema,
  })
  .strict();

export const TodoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TodoFindUniqueOrThrowArgs> =
  z
    .object({
      select: TodoSelectSchema.optional(),
      include: TodoIncludeSchema.optional(),
      where: TodoWhereUniqueInputSchema,
    })
    .strict();

export const PostFindFirstArgsSchema: z.ZodType<Prisma.PostFindFirstArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithRelationInputSchema.array(),
        PostOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: PostWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const PostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostFindFirstOrThrowArgs> =
  z
    .object({
      select: PostSelectSchema.optional(),
      include: PostIncludeSchema.optional(),
      where: PostWhereInputSchema.optional(),
      orderBy: z
        .union([
          PostOrderByWithRelationInputSchema.array(),
          PostOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PostWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const PostFindManyArgsSchema: z.ZodType<Prisma.PostFindManyArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithRelationInputSchema.array(),
        PostOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: PostWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z
  .object({
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithRelationInputSchema.array(),
        PostOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: PostWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z
  .object({
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithAggregationInputSchema.array(),
        PostOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: PostScalarFieldEnumSchema.array(),
    having: PostScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const PostFindUniqueArgsSchema: z.ZodType<Prisma.PostFindUniqueArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    where: PostWhereUniqueInputSchema,
  })
  .strict();

export const PostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostFindUniqueOrThrowArgs> =
  z
    .object({
      select: PostSelectSchema.optional(),
      include: PostIncludeSchema.optional(),
      where: PostWhereUniqueInputSchema,
    })
    .strict();

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    data: z.union([
      AccountCreateInputSchema,
      AccountUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereUniqueInputSchema,
    create: z.union([
      AccountCreateInputSchema,
      AccountUncheckedCreateInputSchema,
    ]),
    update: z.union([
      AccountUpdateInputSchema,
      AccountUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> =
  z
    .object({
      data: z.union([
        AccountCreateManyInputSchema,
        AccountCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereUniqueInputSchema,
  })
  .strict();

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    data: z.union([
      AccountUpdateInputSchema,
      AccountUncheckedUpdateInputSchema,
    ]),
    where: AccountWhereUniqueInputSchema,
  })
  .strict();

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> =
  z
    .object({
      data: z.union([
        AccountUpdateManyMutationInputSchema,
        AccountUncheckedUpdateManyInputSchema,
      ]),
      where: AccountWhereInputSchema.optional(),
    })
    .strict();

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> =
  z
    .object({
      where: AccountWhereInputSchema.optional(),
    })
    .strict();

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    data: z.union([
      SessionCreateInputSchema,
      SessionUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
    create: z.union([
      SessionCreateInputSchema,
      SessionUncheckedCreateInputSchema,
    ]),
    update: z.union([
      SessionUpdateInputSchema,
      SessionUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> =
  z
    .object({
      data: z.union([
        SessionCreateManyInputSchema,
        SessionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
  })
  .strict();

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    data: z.union([
      SessionUpdateInputSchema,
      SessionUncheckedUpdateInputSchema,
    ]),
    where: SessionWhereUniqueInputSchema,
  })
  .strict();

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> =
  z
    .object({
      data: z.union([
        SessionUpdateManyMutationInputSchema,
        SessionUncheckedUpdateManyInputSchema,
      ]),
      where: SessionWhereInputSchema.optional(),
    })
    .strict();

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> =
  z
    .object({
      where: SessionWhereInputSchema.optional(),
    })
    .strict();

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      data: z.union([
        VerificationTokenCreateInputSchema,
        VerificationTokenUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereUniqueInputSchema,
      create: z.union([
        VerificationTokenCreateInputSchema,
        VerificationTokenUncheckedCreateInputSchema,
      ]),
      update: z.union([
        VerificationTokenUpdateInputSchema,
        VerificationTokenUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> =
  z
    .object({
      data: z.union([
        VerificationTokenCreateManyInputSchema,
        VerificationTokenCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereUniqueInputSchema,
    })
    .strict();

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      data: z.union([
        VerificationTokenUpdateInputSchema,
        VerificationTokenUncheckedUpdateInputSchema,
      ]),
      where: VerificationTokenWhereUniqueInputSchema,
    })
    .strict();

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> =
  z
    .object({
      data: z.union([
        VerificationTokenUpdateManyMutationInputSchema,
        VerificationTokenUncheckedUpdateManyInputSchema,
      ]),
      where: VerificationTokenWhereInputSchema.optional(),
    })
    .strict();

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> =
  z
    .object({
      where: VerificationTokenWhereInputSchema.optional(),
    })
    .strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  })
  .strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([
      UserCreateManyInputSchema,
      UserCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([
      UserUpdateManyMutationInputSchema,
      UserUncheckedUpdateManyInputSchema,
    ]),
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const UserProfileCreateArgsSchema: z.ZodType<Prisma.UserProfileCreateArgs> =
  z
    .object({
      select: UserProfileSelectSchema.optional(),
      include: UserProfileIncludeSchema.optional(),
      data: z.union([
        UserProfileCreateInputSchema,
        UserProfileUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const UserProfileUpsertArgsSchema: z.ZodType<Prisma.UserProfileUpsertArgs> =
  z
    .object({
      select: UserProfileSelectSchema.optional(),
      include: UserProfileIncludeSchema.optional(),
      where: UserProfileWhereUniqueInputSchema,
      create: z.union([
        UserProfileCreateInputSchema,
        UserProfileUncheckedCreateInputSchema,
      ]),
      update: z.union([
        UserProfileUpdateInputSchema,
        UserProfileUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const UserProfileCreateManyArgsSchema: z.ZodType<Prisma.UserProfileCreateManyArgs> =
  z
    .object({
      data: z.union([
        UserProfileCreateManyInputSchema,
        UserProfileCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserProfileDeleteArgsSchema: z.ZodType<Prisma.UserProfileDeleteArgs> =
  z
    .object({
      select: UserProfileSelectSchema.optional(),
      include: UserProfileIncludeSchema.optional(),
      where: UserProfileWhereUniqueInputSchema,
    })
    .strict();

export const UserProfileUpdateArgsSchema: z.ZodType<Prisma.UserProfileUpdateArgs> =
  z
    .object({
      select: UserProfileSelectSchema.optional(),
      include: UserProfileIncludeSchema.optional(),
      data: z.union([
        UserProfileUpdateInputSchema,
        UserProfileUncheckedUpdateInputSchema,
      ]),
      where: UserProfileWhereUniqueInputSchema,
    })
    .strict();

export const UserProfileUpdateManyArgsSchema: z.ZodType<Prisma.UserProfileUpdateManyArgs> =
  z
    .object({
      data: z.union([
        UserProfileUpdateManyMutationInputSchema,
        UserProfileUncheckedUpdateManyInputSchema,
      ]),
      where: UserProfileWhereInputSchema.optional(),
    })
    .strict();

export const UserProfileDeleteManyArgsSchema: z.ZodType<Prisma.UserProfileDeleteManyArgs> =
  z
    .object({
      where: UserProfileWhereInputSchema.optional(),
    })
    .strict();

export const PortfolioCreateArgsSchema: z.ZodType<Prisma.PortfolioCreateArgs> =
  z
    .object({
      select: PortfolioSelectSchema.optional(),
      include: PortfolioIncludeSchema.optional(),
      data: z.union([
        PortfolioCreateInputSchema,
        PortfolioUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const PortfolioUpsertArgsSchema: z.ZodType<Prisma.PortfolioUpsertArgs> =
  z
    .object({
      select: PortfolioSelectSchema.optional(),
      include: PortfolioIncludeSchema.optional(),
      where: PortfolioWhereUniqueInputSchema,
      create: z.union([
        PortfolioCreateInputSchema,
        PortfolioUncheckedCreateInputSchema,
      ]),
      update: z.union([
        PortfolioUpdateInputSchema,
        PortfolioUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const PortfolioCreateManyArgsSchema: z.ZodType<Prisma.PortfolioCreateManyArgs> =
  z
    .object({
      data: z.union([
        PortfolioCreateManyInputSchema,
        PortfolioCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PortfolioDeleteArgsSchema: z.ZodType<Prisma.PortfolioDeleteArgs> =
  z
    .object({
      select: PortfolioSelectSchema.optional(),
      include: PortfolioIncludeSchema.optional(),
      where: PortfolioWhereUniqueInputSchema,
    })
    .strict();

export const PortfolioUpdateArgsSchema: z.ZodType<Prisma.PortfolioUpdateArgs> =
  z
    .object({
      select: PortfolioSelectSchema.optional(),
      include: PortfolioIncludeSchema.optional(),
      data: z.union([
        PortfolioUpdateInputSchema,
        PortfolioUncheckedUpdateInputSchema,
      ]),
      where: PortfolioWhereUniqueInputSchema,
    })
    .strict();

export const PortfolioUpdateManyArgsSchema: z.ZodType<Prisma.PortfolioUpdateManyArgs> =
  z
    .object({
      data: z.union([
        PortfolioUpdateManyMutationInputSchema,
        PortfolioUncheckedUpdateManyInputSchema,
      ]),
      where: PortfolioWhereInputSchema.optional(),
    })
    .strict();

export const PortfolioDeleteManyArgsSchema: z.ZodType<Prisma.PortfolioDeleteManyArgs> =
  z
    .object({
      where: PortfolioWhereInputSchema.optional(),
    })
    .strict();

export const PhotoShootTypeCreateArgsSchema: z.ZodType<Prisma.PhotoShootTypeCreateArgs> =
  z
    .object({
      select: PhotoShootTypeSelectSchema.optional(),
      include: PhotoShootTypeIncludeSchema.optional(),
      data: z.union([
        PhotoShootTypeCreateInputSchema,
        PhotoShootTypeUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const PhotoShootTypeUpsertArgsSchema: z.ZodType<Prisma.PhotoShootTypeUpsertArgs> =
  z
    .object({
      select: PhotoShootTypeSelectSchema.optional(),
      include: PhotoShootTypeIncludeSchema.optional(),
      where: PhotoShootTypeWhereUniqueInputSchema,
      create: z.union([
        PhotoShootTypeCreateInputSchema,
        PhotoShootTypeUncheckedCreateInputSchema,
      ]),
      update: z.union([
        PhotoShootTypeUpdateInputSchema,
        PhotoShootTypeUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const PhotoShootTypeCreateManyArgsSchema: z.ZodType<Prisma.PhotoShootTypeCreateManyArgs> =
  z
    .object({
      data: z.union([
        PhotoShootTypeCreateManyInputSchema,
        PhotoShootTypeCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PhotoShootTypeDeleteArgsSchema: z.ZodType<Prisma.PhotoShootTypeDeleteArgs> =
  z
    .object({
      select: PhotoShootTypeSelectSchema.optional(),
      include: PhotoShootTypeIncludeSchema.optional(),
      where: PhotoShootTypeWhereUniqueInputSchema,
    })
    .strict();

export const PhotoShootTypeUpdateArgsSchema: z.ZodType<Prisma.PhotoShootTypeUpdateArgs> =
  z
    .object({
      select: PhotoShootTypeSelectSchema.optional(),
      include: PhotoShootTypeIncludeSchema.optional(),
      data: z.union([
        PhotoShootTypeUpdateInputSchema,
        PhotoShootTypeUncheckedUpdateInputSchema,
      ]),
      where: PhotoShootTypeWhereUniqueInputSchema,
    })
    .strict();

export const PhotoShootTypeUpdateManyArgsSchema: z.ZodType<Prisma.PhotoShootTypeUpdateManyArgs> =
  z
    .object({
      data: z.union([
        PhotoShootTypeUpdateManyMutationInputSchema,
        PhotoShootTypeUncheckedUpdateManyInputSchema,
      ]),
      where: PhotoShootTypeWhereInputSchema.optional(),
    })
    .strict();

export const PhotoShootTypeDeleteManyArgsSchema: z.ZodType<Prisma.PhotoShootTypeDeleteManyArgs> =
  z
    .object({
      where: PhotoShootTypeWhereInputSchema.optional(),
    })
    .strict();

export const PhotographySkillCreateArgsSchema: z.ZodType<Prisma.PhotographySkillCreateArgs> =
  z
    .object({
      select: PhotographySkillSelectSchema.optional(),
      include: PhotographySkillIncludeSchema.optional(),
      data: z.union([
        PhotographySkillCreateInputSchema,
        PhotographySkillUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const PhotographySkillUpsertArgsSchema: z.ZodType<Prisma.PhotographySkillUpsertArgs> =
  z
    .object({
      select: PhotographySkillSelectSchema.optional(),
      include: PhotographySkillIncludeSchema.optional(),
      where: PhotographySkillWhereUniqueInputSchema,
      create: z.union([
        PhotographySkillCreateInputSchema,
        PhotographySkillUncheckedCreateInputSchema,
      ]),
      update: z.union([
        PhotographySkillUpdateInputSchema,
        PhotographySkillUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const PhotographySkillCreateManyArgsSchema: z.ZodType<Prisma.PhotographySkillCreateManyArgs> =
  z
    .object({
      data: z.union([
        PhotographySkillCreateManyInputSchema,
        PhotographySkillCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PhotographySkillDeleteArgsSchema: z.ZodType<Prisma.PhotographySkillDeleteArgs> =
  z
    .object({
      select: PhotographySkillSelectSchema.optional(),
      include: PhotographySkillIncludeSchema.optional(),
      where: PhotographySkillWhereUniqueInputSchema,
    })
    .strict();

export const PhotographySkillUpdateArgsSchema: z.ZodType<Prisma.PhotographySkillUpdateArgs> =
  z
    .object({
      select: PhotographySkillSelectSchema.optional(),
      include: PhotographySkillIncludeSchema.optional(),
      data: z.union([
        PhotographySkillUpdateInputSchema,
        PhotographySkillUncheckedUpdateInputSchema,
      ]),
      where: PhotographySkillWhereUniqueInputSchema,
    })
    .strict();

export const PhotographySkillUpdateManyArgsSchema: z.ZodType<Prisma.PhotographySkillUpdateManyArgs> =
  z
    .object({
      data: z.union([
        PhotographySkillUpdateManyMutationInputSchema,
        PhotographySkillUncheckedUpdateManyInputSchema,
      ]),
      where: PhotographySkillWhereInputSchema.optional(),
    })
    .strict();

export const PhotographySkillDeleteManyArgsSchema: z.ZodType<Prisma.PhotographySkillDeleteManyArgs> =
  z
    .object({
      where: PhotographySkillWhereInputSchema.optional(),
    })
    .strict();

export const TodoCreateArgsSchema: z.ZodType<Prisma.TodoCreateArgs> = z
  .object({
    select: TodoSelectSchema.optional(),
    include: TodoIncludeSchema.optional(),
    data: z.union([TodoCreateInputSchema, TodoUncheckedCreateInputSchema]),
  })
  .strict();

export const TodoUpsertArgsSchema: z.ZodType<Prisma.TodoUpsertArgs> = z
  .object({
    select: TodoSelectSchema.optional(),
    include: TodoIncludeSchema.optional(),
    where: TodoWhereUniqueInputSchema,
    create: z.union([TodoCreateInputSchema, TodoUncheckedCreateInputSchema]),
    update: z.union([TodoUpdateInputSchema, TodoUncheckedUpdateInputSchema]),
  })
  .strict();

export const TodoCreateManyArgsSchema: z.ZodType<Prisma.TodoCreateManyArgs> = z
  .object({
    data: z.union([
      TodoCreateManyInputSchema,
      TodoCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const TodoDeleteArgsSchema: z.ZodType<Prisma.TodoDeleteArgs> = z
  .object({
    select: TodoSelectSchema.optional(),
    include: TodoIncludeSchema.optional(),
    where: TodoWhereUniqueInputSchema,
  })
  .strict();

export const TodoUpdateArgsSchema: z.ZodType<Prisma.TodoUpdateArgs> = z
  .object({
    select: TodoSelectSchema.optional(),
    include: TodoIncludeSchema.optional(),
    data: z.union([TodoUpdateInputSchema, TodoUncheckedUpdateInputSchema]),
    where: TodoWhereUniqueInputSchema,
  })
  .strict();

export const TodoUpdateManyArgsSchema: z.ZodType<Prisma.TodoUpdateManyArgs> = z
  .object({
    data: z.union([
      TodoUpdateManyMutationInputSchema,
      TodoUncheckedUpdateManyInputSchema,
    ]),
    where: TodoWhereInputSchema.optional(),
  })
  .strict();

export const TodoDeleteManyArgsSchema: z.ZodType<Prisma.TodoDeleteManyArgs> = z
  .object({
    where: TodoWhereInputSchema.optional(),
  })
  .strict();

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    data: z.union([PostCreateInputSchema, PostUncheckedCreateInputSchema]),
  })
  .strict();

export const PostUpsertArgsSchema: z.ZodType<Prisma.PostUpsertArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    where: PostWhereUniqueInputSchema,
    create: z.union([PostCreateInputSchema, PostUncheckedCreateInputSchema]),
    update: z.union([PostUpdateInputSchema, PostUncheckedUpdateInputSchema]),
  })
  .strict();

export const PostCreateManyArgsSchema: z.ZodType<Prisma.PostCreateManyArgs> = z
  .object({
    data: z.union([
      PostCreateManyInputSchema,
      PostCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    where: PostWhereUniqueInputSchema,
  })
  .strict();

export const PostUpdateArgsSchema: z.ZodType<Prisma.PostUpdateArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    data: z.union([PostUpdateInputSchema, PostUncheckedUpdateInputSchema]),
    where: PostWhereUniqueInputSchema,
  })
  .strict();

export const PostUpdateManyArgsSchema: z.ZodType<Prisma.PostUpdateManyArgs> = z
  .object({
    data: z.union([
      PostUpdateManyMutationInputSchema,
      PostUncheckedUpdateManyInputSchema,
    ]),
    where: PostWhereInputSchema.optional(),
  })
  .strict();

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z
  .object({
    where: PostWhereInputSchema.optional(),
  })
  .strict();
