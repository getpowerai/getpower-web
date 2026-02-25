import { CaseManager } from "@/components/admin/CaseManager";
import { getCases } from "@/app/actions/caseActions";

export default async function CasesAdminPage() {
    const cases = await getCases();

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">精選個案管理</h1>
                </div>
                <div className="mt-8">
                    <CaseManager initialCases={cases} />
                </div>
            </div>
        </div>
    );
}
