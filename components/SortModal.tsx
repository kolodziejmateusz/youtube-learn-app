import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import {
  COLORS,
  SPACING,
  FONTS,
  FONT_SIZES,
  BORDER_RADIUS,
  DIMENSIONS,
} from "@/constants/theme";
import { useTranslation } from "react-i18next";

export type SortOption = "latest" | "oldest" | "popular";

type SortModalProps = {
  visible: boolean;
  onClose: () => void;
  onSortSelect: (option: SortOption) => void;
  selectedSort: SortOption;
};

export default function SortModal({
  visible,
  onClose,
  onSortSelect,
  selectedSort,
}: SortModalProps) {
  const { t } = useTranslation();

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "latest", label: t("sortModal.options.latest") },
    { value: "oldest", label: t("sortModal.options.oldest") },
    { value: "popular", label: t("sortModal.options.popular") },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t("sortModal.title")}</Text>

          {sortOptions.map((option) => (
            <Pressable
              key={option.value}
              style={styles.optionContainer}
              onPress={() => {
                onSortSelect(option.value);
                onClose();
              }}
            >
              <View
                style={[
                  styles.radioButton,
                  selectedSort === option.value && styles.radioButtonSelected,
                ]}
              >
                {selectedSort === option.value && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={styles.optionLabel}>{option.label}</Text>
            </Pressable>
          ))}

          <Pressable style={styles.confirmButton} onPress={onClose}>
            <Text style={styles.confirmButtonText}>
              {t("sortModal.confirm")}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.backgroundLight,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.xxxl,
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.huge,
  },
  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.lg,
    color: COLORS.light,
    marginBottom: SPACING.xxxl,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xl,
    paddingVertical: SPACING.md,
  },
  radioButton: {
    width: DIMENSIONS.iconSize,
    height: DIMENSIONS.iconSize,
    borderRadius: DIMENSIONS.iconSize / 2,
    borderWidth: 2,
    borderColor: COLORS.light,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.lg,
  },
  radioButtonSelected: {
    backgroundColor: COLORS.light,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.backgroundLight,
  },
  optionLabel: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.md,
    color: COLORS.light,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.card,
    paddingVertical: SPACING.lg,
    marginTop: SPACING.xxxl,
    alignItems: "center",
  },
  confirmButtonText: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.md,
    color: COLORS.light,
  },
});
