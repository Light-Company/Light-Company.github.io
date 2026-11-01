const insertIfNew = `INSERT INTO preorder_interest (
  full_name, email, company, role, use_case, robot, quantity, updates_opt_in,
  source, consent_version, created_at, updated_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
ON CONFLICT(email) DO NOTHING`;

/** Keep the first submission; an unverified email must not authorize later profile or consent changes. */
export async function savePreorderInterest(database, interest) {
  const result = await database.prepare(insertIfNew).bind(
    interest.fullName,
    interest.email,
    interest.company,
    interest.role,
    interest.useCase,
    interest.robot,
    interest.quantity,
    interest.updatesOptIn ? 1 : 0,
    interest.source,
    interest.consentVersion,
    interest.createdAt,
    interest.updatedAt,
  ).run();
  if (result?.success !== true || ![0, 1].includes(result.meta?.changes)) {
    throw new Error("Preorder interest was not persisted");
  }
}
