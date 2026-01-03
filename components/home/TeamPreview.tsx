"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    key: "jwan",
    image: null,
    initials: "JA",
    gradientFrom: "from-primary",
    gradientTo: "to-secondary",
  },
  {
    key: "khakan",
    image: null,
    initials: "KA",
    gradientFrom: "from-secondary",
    gradientTo: "to-primary",
  },
];

export default function TeamPreview() {
  const t = useTranslations("team");
  const tHome = useTranslations("home.team");

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-1.5 mb-4">
            <span className="text-primary text-sm font-medium">{tHome("title")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            {tHome("subtitle")}
          </h2>
        </motion.div>

        {/* Team Members */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Avatar Section */}
                    <div className="sm:w-1/3 bg-gradient-to-br from-accent via-muted to-accent p-6 flex items-center justify-center">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${member.gradientFrom} ${member.gradientTo} rounded-full blur-xl opacity-30`} />
                        <Avatar className="h-32 w-32 border-4 border-white shadow-xl relative">
                          <AvatarImage src={member.image || undefined} alt={t(`members.${member.key}.name`)} />
                          <AvatarFallback className={`bg-gradient-to-br ${member.gradientFrom} ${member.gradientTo} text-white text-3xl font-serif tracking-wider`}>
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    
                    {/* Info Section */}
                    <div className="sm:w-2/3 p-6">
                      <h3 className="text-xl font-serif font-semibold text-foreground mb-1">
                        {t(`members.${member.key}.name`)}
                      </h3>
                      <p className="text-primary font-medium text-sm mb-1">
                        {t(`members.${member.key}.role`)}
                      </p>
                      {t(`members.${member.key}.subtitle`) && (
                        <p className="text-muted-foreground text-xs mb-3">
                          {t(`members.${member.key}.subtitle`)}
                        </p>
                      )}
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t(`members.${member.key}.description`)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/team">
              {tHome("viewAll")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

