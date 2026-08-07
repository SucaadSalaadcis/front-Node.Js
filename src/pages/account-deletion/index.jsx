import SeoHead from "@/utils/SeoHead";
import PageHeader from "@/utils/PageHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const AccountDeletion = () => {
    const { t } = useTranslation();

    return (
        <>
            <SeoHead />
            <PageHeader title="حذف الحساب" subTitle="حذف الحساب" />
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 p-8">
                        <h2 className="text-2xl font-bold mb-6 text-right">كيفية طلب حذف الحساب</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">1</span>
                                <div>
                                    <p className="font-semibold">باستخدام التطبيق:</p>
                                    <p className="text-gray-600">اذهب إلى الإعدادات &gt; حذف الحساب داخل تطبيق ElFergany Market</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">2</span>
                                <div>
                                    <p className="font-semibold">عبر البريد الإلكتروني:</p>
                                    <p className="text-gray-600">أرسل طلبك من البريد المسجل به الحساب إلى <a href="mailto:support@el-fergany.com" className="text-red-600 underline">support@el-fergany.com</a></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 p-8">
                        <h2 className="text-2xl font-bold mb-6 text-right">البيانات التي يتم حذفها</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 text-right">
                            <li>معلومات الحساب الشخصية (الاسم، البريد الإلكتروني، رقم الهاتف)</li>
                            <li>عناوين التوصيل</li>
                            <li>قائمة المفضلة (Wishlist)</li>
                            <li>التقييمات والمراجعات</li>
                            <li>محتويات سلة التسوق</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-10 mb-6 text-right">البيانات التي يتم الاحتفاظ بها</h2>
                        <p className="text-gray-700 mb-4 text-right">قد يتم الاحتفاظ ببعض البيانات للامتثال للالتزامات القانونية وحفظ السجلات:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 text-right">
                            <li>سجل الطلبات السابقة (لأغراض المحاسبة والضريبة)</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-10 mb-6 text-right">فترة الاحتفاظ</h2>
                        <p className="text-gray-700 text-right">يتم حذف البيانات الشخصية فوراً بعد تقديم الطلب. يتم الاحتفاظ بسجل الطلبات لمدة 5 سنوات وفقاً للمتطلبات القانونية والضريبية، وبعد ذلك يتم حذفها بالكامل.</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 p-8" dir="ltr">
                        <h2 className="text-2xl font-bold mb-6">How to Request Account Deletion</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">1</span>
                                <div>
                                    <p className="font-semibold">Via the App:</p>
                                    <p className="text-gray-600">Go to Settings &gt; Delete Account inside the ElFergany Market app</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">2</span>
                                <div>
                                    <p className="font-semibold">Via Email:</p>
                                    <p className="text-gray-600">Send your request from the registered email to <a href="mailto:support@el-fergany.com" className="text-red-600 underline">support@el-fergany.com</a></p>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mt-10 mb-6">Data Deleted</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Personal profile information (name, email, phone number)</li>
                            <li>Delivery addresses</li>
                            <li>Wishlist items</li>
                            <li>Product reviews and ratings</li>
                            <li>Shopping cart contents</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-10 mb-6">Data Retained</h2>
                        <p className="text-gray-700 mb-4">Certain data may be retained to comply with legal obligations and record keeping:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Past order history (for accounting and tax purposes)</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-10 mb-6">Retention Period</h2>
                        <p className="text-gray-700">Personal data is deleted immediately after the request is processed. Order history is retained for 5 years as required by legal and tax regulations, after which it is permanently deleted.</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AccountDeletion;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["menu", "common", "header"])),
        },
    };
}
